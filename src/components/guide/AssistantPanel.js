"use client";

import { useRef, useState } from "react";

export default function AssistantPanel({
  stageSlug,
  subStageSlug = "",
  itemSlug = "",
  scopeLabel,
}) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const recorderRef = useRef(null);
  const fileRef = useRef(null);

  async function toggleMic() {
    if (recording && recorderRef.current) {
      recorderRef.current.stop();
      setRecording(false);
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      setError("This browser cannot record audio. You can still type.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const media = new MediaRecorder(stream);
      const chunks = [];
      media.ondataavailable = (event) => {
        if (event.data.size) chunks.push(event.data);
      };
      media.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
        setAudioBlob(new Blob(chunks, { type: media.mimeType || "audio/webm" }));
      };
      recorderRef.current = media;
      media.start();
      setRecording(true);
      setError("");
    } catch {
      setError("The microphone was not allowed. You can still type or add a photo.");
    }
  }

  async function onSubmit(event) {
    event.preventDefault();
    if (!text.trim() && !imageFile && !audioBlob) {
      setError("Add a note, a photo, or a voice clip.");
      return;
    }

    const mine = text.trim() || (imageFile ? "Photo attached" : "Voice note");
    setMessages((current) => [...current, { role: "you", text: mine }]);
    setPending(true);
    setError("");

    const body = new FormData();
    body.set("stageSlug", stageSlug);
    body.set("subStageSlug", subStageSlug);
    body.set("itemSlug", itemSlug);
    body.set("message", text.trim());
    if (imageFile) body.set("image", imageFile);
    if (audioBlob) body.set("audio", audioBlob, "note.webm");

    setText("");
    setImageFile(null);
    setAudioBlob(null);
    if (fileRef.current) fileRef.current.value = "";

    try {
      const response = await fetch("/api/assist", { method: "POST", body });
      const data = await response.json().catch(() => ({}));
      setMessages((current) => [
        ...current,
        { role: "guide", text: data.reply || data.error || "AI assistant coming soon" },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        { role: "guide", text: "AI assistant coming soon" },
      ]);
    }
    setPending(false);
  }

  return (
    <aside className="rounded-lg border border-line bg-ink-soft p-5">
      <p className="text-[0.68rem] uppercase tracking-[0.18em] text-gold">Assistant</p>
      <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.02em] text-cream">
        Ask about this
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-cream-dim">{scopeLabel}</p>
      <div className="mt-4 space-y-3">
        {messages.length === 0 ? (
          <p className="text-sm leading-relaxed text-cream-dim">
            Photos and voice stay on this phone for now. The reply is a placeholder until an assistant is connected.
          </p>
        ) : (
          messages.map((message, index) => (
            <p
              key={`${message.role}-${index}`}
              className={`rounded-lg px-3 py-2 text-sm leading-relaxed ${
                message.role === "you" ? "bg-ink text-cream" : "border border-gold/30 text-cream"
              }`}
            >
              {message.text}
            </p>
          ))
        )}
      </div>
      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <label htmlFor={`assist-${itemSlug || subStageSlug || stageSlug}`} className="sr-only">
          Message
        </label>
        <textarea
          id={`assist-${itemSlug || subStageSlug || stageSlug}`}
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={3}
          placeholder="Ask about this part of the work"
          className="w-full resize-none rounded-lg border border-line bg-ink px-3 py-2 text-base text-cream outline-none placeholder:text-[#9c9284] focus:border-gold/70"
        />
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="inline-flex h-10 items-center rounded-full border border-line px-3 text-sm text-cream"
          >
            Photo
          </button>
          <button
            type="button"
            onClick={toggleMic}
            className={`inline-flex h-10 items-center rounded-full border px-3 text-sm ${
              recording ? "border-gold text-gold" : "border-line text-cream"
            }`}
            aria-pressed={recording}
          >
            {recording ? "Stop mic" : "Mic"}
          </button>
          <button
            type="submit"
            disabled={pending}
            className="inline-flex h-10 items-center rounded-full bg-cream px-4 text-sm font-medium text-ink disabled:opacity-60"
          >
            {pending ? "Sending…" : "Send"}
          </button>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="sr-only"
          onChange={(event) => {
            const file = event.target.files?.[0] ?? null;
            setImageFile(file);
            setError("");
          }}
        />
        {imageFile ? <p className="text-xs text-cream-dim">Photo ready: {imageFile.name}</p> : null}
        {audioBlob ? <p className="text-xs text-cream-dim">Voice note ready on this device.</p> : null}
        {error ? <p className="text-sm text-[#f0cfc4]">{error}</p> : null}
      </form>
    </aside>
  );
}
