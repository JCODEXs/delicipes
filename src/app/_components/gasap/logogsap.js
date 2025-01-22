gsap.registerPlugin(DrawSVGPlugin);

const bodyColor = ["#565659", "#3D5741", "#4C4F79", "#55C2CB", "#D7B4B2"];
const pathColor = ["#F2F2F2", "#84AC7F", "#C4AA7B", "#F3E7CA", "#414C61"];
index = 0;

gsap.set(".strokes", { drawSVG: 0, stroke: "#F2F2F2" });

let tl = gsap.timeline({
  defaults: { ease: "none" },
  repeat: -1,
  repeatDelay: 1,
});

tl.timeScale(2);

tl.to("#path1", {
  drawSVG: true,
  ease: "sine.in",
  duration: 1,
})
  .to(
    "#path2, #path3",
    {
      drawSVG: true,
      ease: "sine.inOut",
      duration: 0.4,
      stagger: 0.3,
    },
    "<1.2",
  )
  .to("#path4", {
    drawSVG: true,
    ease: "sine.in",
    duration: 0.6,
  })
  .to(
    "#path5",
    {
      drawSVG: true,
      ease: "sine.in",
      duration: 0.5,
    },
    "+=0.5",
  )
  .to(
    "#path6",
    {
      drawSVG: true,
      ease: "sine.inout",
      duration: 1.5,
    },
    "<0.4",
  )
  .to(
    "#path7",
    {
      drawSVG: true,
      ease: "sine.in",
      duration: 1,
    },
    "<0.6",
  )
  .to(
    "#path8",
    {
      drawSVG: true,
      ease: "sine.in",
      duration: 0.5,
    },
    "+=0.3",
  )
  .to("#path9", {
    drawSVG: true,
    ease: "sine.in",
    duration: 0.6,
  })
  .to(
    "#path10",
    {
      drawSVG: true,
      ease: "sine.inout",
      duration: 1.1,
    },
    "<0.5",
  )
  .to(
    "#path11, #path12",
    {
      drawSVG: true,
      ease: "sine.in",
      duration: 0.4,
      stagger: 0.3,
    },
    "+=0.2",
  )
  .to(
    "#path13",
    {
      drawSVG: true,
      ease: "power3.inout",
      duration: 0.8,
    },
    "+=0.3",
  )
  .to(
    "#path14",
    {
      drawSVG: true,
      ease: "power3.inout",
      duration: 0.8,
    },
    "+=0.3",
  )
  .to(
    "#path15",
    {
      drawSVG: true,
      ease: "sine.in",
      duration: 0.3,
    },
    "+=0.6",
  )
  .to(
    "#path16",
    {
      drawSVG: true,
      ease: "power2.inout",
      duration: 1.3,
    },
    "-=0.1",
  )
  .to("svg", {
    opacity: 0,
    ease: "power2.inout",
    duration: 2,
  });

window.addEventListener(
  "click",
  function () {
    // tl.restart();
    index = (index + 1) % bodyColor.length;
    gsap.to("body", { backgroundColor: bodyColor[index], ease: "none" });
    gsap.to(".strokes", { stroke: pathColor[index], ease: "none" });
    gsap.to(".text", { color: pathColor[index], ease: "none" });
  },
  false,
);
