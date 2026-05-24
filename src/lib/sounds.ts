"use client";

class SoundManager {
  private muted = false;
  private audioCtx: AudioContext | null = null;

  private getCtx(): AudioContext {
    if (!this.audioCtx) {
      this.audioCtx = new AudioContext();
    }
    return this.audioCtx;
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }

  private playTone(freq: number, duration: number, type: OscillatorType = "sine", volume = 0.06) {
    if (this.muted) return;
    try {
      const ctx = this.getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch {}
  }

  beep() {
    this.playTone(660, 0.12, "sine", 0.05);
  }

  keyClick() {
    this.playTone(1000, 0.03, "sine", 0.03);
  }

  success() {
    if (this.muted) return;
    setTimeout(() => this.playTone(523, 0.15, "sine", 0.08), 0);
    setTimeout(() => this.playTone(659, 0.15, "sine", 0.08), 150);
    setTimeout(() => this.playTone(784, 0.2, "sine", 0.08), 300);
  }

  glitch() {
    this.playTone(200, 0.15, "sawtooth", 0.04);
  }

  hoverTick() {
    this.playTone(1200, 0.02, "sine", 0.02);
  }

  accessGranted() {
    if (this.muted) return;
    setTimeout(() => this.playTone(440, 0.1, "sine", 0.08), 0);
    setTimeout(() => this.playTone(554, 0.1, "sine", 0.08), 100);
    setTimeout(() => this.playTone(659, 0.15, "sine", 0.1), 200);
    setTimeout(() => this.playTone(880, 0.3, "sine", 0.12), 350);
  }
}

export const soundManager = new SoundManager();
