"use client"
import Image from "next/image";
import EquinoxMain from "./sections/EquinoxMain/EquinoxMain";
import Flagship from "./sections/Flagship/Flagship";
import Events from "./sections/Events/Events";
import Lenis from '@studio-freight/lenis'
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      wrapper: document.querySelector("html"),
      content: document.querySelector("#page"),
      duration: 1.2,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: true,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, [])
  return (
    <div id="page">
      <EquinoxMain />
      <Flagship />
      <Events />
    </div>
  );
}
