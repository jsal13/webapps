import { Formatter, Renderer, Stave, StaveNote, Voice } from "https://esm.sh/vexflow@5.0.0";

document.addEventListener("DOMContentLoaded", () => {
  if (window.renderMathInElement) {
    window.renderMathInElement(document.body, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "\\(", right: "\\)", display: false }
      ],
      throwOnError: false
    });
  }

  document.querySelectorAll("[data-staff]").forEach((container) => {
    const renderer = new Renderer(container, Renderer.Backends.SVG);
    renderer.resize(520, 150);
    const context = renderer.getContext();
    const stave = new Stave(10, 20, 480);
    stave.addClef(container.dataset.clef || "treble").setContext(context).draw();

    const notes = (container.dataset.notes || "c/4/q,d/4/q,e/4/q,f/4/q")
      .split(",")
      .map((note) => {
        const [letter, octave, duration] = note.split("/");
        const key = `${letter}/${octave}`;
        return new StaveNote({ keys: [key], duration });
      });
    const voice = new Voice({ num_beats: notes.length, beat_value: 4 });
    voice.addTickables(notes);
    new Formatter().joinVoices([voice]).format([voice], 390);
    voice.draw(context, stave);
  });
});
