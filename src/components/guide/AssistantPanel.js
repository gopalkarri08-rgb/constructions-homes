"use client";

import { ArrowUp, Camera, Mic } from "lucide-react";
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
  const fieldId = `assist-${itemSlug || subStageSlug || stageSlug}`;

  async function toggleMic() {
    if (recording && recorderRef.current) {
      recorderRef.current.stop();
      setRecording(false);
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia) {
      setError("This browser cannot record. You can still type.");
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
      setError("Microphone was not allowed. You can still type or add a photo.");
    }
  }

  async function onSubmit(event) {
    event.preventDefault();
    if (!text.trim() && !imageFile && !audioBlob) {
      setError("Add a note, a photo, or a voice clip.");
      return;
    }
    const mine = text.trim() || (imageFile ? "Photo" : "Voice note");
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
      setMessages((current) => [...current, { role: "guide", text: "AI assistant coming soon" }]);
    }
    setPending(false);
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-ink/95 backdrop-blur-md">
      <form onSubmit={onSubmit} className="mx-auto w-full max-w-3xl px-3 py-2 sm:px-5">
        <p className="truncate px-1 text-xs text-cream-dim">{scopeLabel}</p>
        {messages.length > 0 ? (
          <div className="mt-1 max-h-28 space-y-1 overflow-y-auto">
            {messages.slice(-4).map((message, index) => (
              <p
                key={`${message.role}-${index}`}
                className={`rounded-2xl px-3 py-1.5 text-sm leading-snug ${
                  message.role === "you" ? "ml-8 bg-ink-soft text-cream" : "mr-8 border border-gold/30 text-cream"
                }`}
              >
                {message.text}
              </p>
            ))}
          </div>
        ) : null}
        <div className="mt-1 flex items-end gap-2">
          <label htmlFor={fieldId} className="sr-only">
            Message the assistant
          </label>
          <textarea
            id={fieldId}
            value={text}
            rows={1}
            onChange={(event) => setText(event.target.value)}
            placeholder="Ask about this step"
            className="max-h-24 min-h-11 flex-1 resize-none rounded-full border border-line bg-ink-soft px-4 py-2.5 text-base text-cream outline-none placeholder:text-[#9c9284] focus:border-gold/70"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-cream"
            aria-label="Add a photo"
          >
            <Camera className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={toggleMic}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full border ${
              recording ? "border-gold text-gold" : "border-line text-cream"
            }`}
            aria-label={recording ? "Stop recording" : "Record a voice note"}
            aria-pressed={recording}
          >
            <Mic className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="submit"
            disabled={pending}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream text-ink disabled:opacity-60"
            aria-label="Send"
          >
            <ArrowUp className="h-5 w-5" aria-hidden />
          </button>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="sr-only"
          onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
        />
        {imageFile || audioBlob || error ? (
          <p className="px-2 pt-1 text-xs text-cream-dim">
            {error ||
              [imageFile ? `Photo ready: ${imageFile.name}` : "", audioBlob ? "Voice note ready." : ""]
                .filter(Boolean)
                .join(" ")}
          </p>
        ) : null}
      </form>
    </div>
  );
}
