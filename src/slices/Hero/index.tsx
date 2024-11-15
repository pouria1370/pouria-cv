"use client";
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";
/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */

const getTheCharacters = (str: KeyTextField, key: string) => {
  return str?.split("").map((item, index) => (
    <span
      key={index}
      className={`name-animation inline-block opacity-0 name-animation-${key}`}
    >
      {item}
    </span>
  ));
};
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const component = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        ".name-animation",
        { x: -100, opacity: 0, rotate: -10 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          ease: "elastic.out(1,0.3)",
          duration: 1,
          delay: 0.5,
          transformOrigin: "left top",
          stagger: {
            each: 0.1,
            from: "random",
          },
        }
      ),
        tl.fromTo(
          ".job-info",
          {
            y: 20,
            opacity: 0,
            scale: 1.2,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scale: 1,
            ease: "elastic.out(1,0.3)",
          }
        );
    }, component);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid grid-cols-1 min-h-[70vh] md:grid-cols-2 items-center">
        <div ref={component} className="col-start-1 md:row-start-1 ">
          <h1 className="text-[clamp(3rem,20vmin,20rem)] leading-none tracking-tighter">
            <span className="text-slate-300 block">
              {getTheCharacters(slice.primary.firstname, "first")}
            </span>
            <span className="text-slate-600 block">
              {getTheCharacters(slice.primary.lastname, "last")}
            </span>
          </h1>
          <span className="job-info block bg-gradient-to-tr uppercase  from-red-400 via-red-500 to-red-900 bg-clip-text text-transparent text-2xl md:text-4xl">
            {slice.primary.titletag}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
