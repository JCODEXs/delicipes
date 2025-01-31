import React, { useEffect, useRef } from "react";

const AnimatedSVGComponent = () => {
  function AnimatedSVG() {
    return (
      <svg
        id="epSC0IkZRws1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 173.81842 180.04564"
        shape-rendering="geometricPrecision"
        text-rendering="geometricPrecision"
      >
        {/* <!-- <defs>
             <filter
               id="epSC0IkZRws5-filter"
               x="-150%"
               width="400%"
               y="-150%"
               height="400%"
             >
               <feColorMatrix
                 id="epSC0IkZRws5-filter-grayscale-0"
                 type="matrix"
                 values="0.80315 0.1788 0.01805 0 0 0.05315 0.9288 0.01805 0 0 0.05315 0.1788 0.76805 0 0 0 0 0 1 0"
                 result="result"
               />
             </filter>
           </defs> --> */}
        <path
          d="M88.362585,5.016756c0,0-6.742412,43.654195-1.453375,93.983051c2.480279,26.375046,11.684785,38.816495,5.014991,82.857584"
          transform="matrix(.793076 0.017638 0.012264 0.968291 16.196129-1.346026)"
          fill="none"
          stroke="#112a5e"
          stroke-width="14"
          stroke-linecap="round"
          stroke-dashoffset="177.79"
          stroke-dasharray="177.79"
        />
        <path
          d="M108.472358,126.999937c12.00001,14.999784,36.466638,10.288567,30.857746,25.535914-5.436703,14.779265-47.971466,22.11908-47.971466,22.11908s-54.310078-3.108821-61.976744-24.763868c15.385646-5.704656,49.150178-7.512036,66.726263-22.891127c1.61014-1.408874,7.455266-4.596635,7.455266-10.004034s-19.091064-4.698208-19.091064-4.698208-12.641682-1.176432-13.999998-8.297897C68.286049,92.537259,98.063273,87.654055,97.472358,75.999848c-.258705-5.102257-7.629351-10.191351-12.999999-10.772509s-13.290672,4.393355-16.999998,8.772513c-7.656084,9.038624-13.592221,25.83921-12.087965,37.58866c2.89399,22.604383,40.723761,61.79545,40.723761,61.79545"
          transform="translate(-.029256 1.711223)"
          filter="url(#epSC0IkZRws5-filter)"
          fill="none"
          stroke="#0a2150"
          stroke-width="9"
          stroke-linecap="round"
          stroke-linejoin="bevel"
          stroke-miterlimit="20"
          stroke-dashoffset="485.92"
          stroke-dasharray="485.92"
        />
        <path d="" fill="none" stroke="#3f5787" stroke-width="0.5" />
        <path
          d="M94.998564,3.981633c80.484648,13.30939,91.379691,107.606878,55.383538,147.321309"
          transform="matrix(.961318 0 0 0.985422 4.755071 1.146582)"
          fill="none"
          stroke="#0b1e47"
          stroke-width="8"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-dashoffset="189.97"
          stroke-dasharray="189.97"
        />
        <path
          d="M100.348132,30.004563c0,0,5.546253-1.275896,8.12423,5.589128c1.957263,6.533479-24.320255,18.91527-32.810178,20.185124-13.825781,1.788928-21.192054-8.550929-21.192054-8.550929"
          transform="matrix(.968816 0 0 0.998568 2.583607 0.060947)"
          fill="none"
          stroke="#071a3e"
          stroke-width="12"
          stroke-linecap="round"
          stroke-dashoffset="74.82"
          stroke-dasharray="74.82"
        />
        <path
          d="M75.886341,4.586676C22.886344,12.245598,-16.84962,66.938561,13.66422,128.711158"
          transform="translate(0 0.000001)"
          fill="none"
          stroke="#3f5787"
          stroke-width="8"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-dashoffset="193.08"
          stroke-dasharray="193.08"
        />
        <path
          d="M18.025419,98.999807c0,0-2.763886,5.49819-1.105672,6.999986c5.236648,4.742678,8.310942,16.153245,14.854161,14.953464s-1.047452-15.294014,4.698456-21.95345"
          transform="matrix(.854323 0 0 0.705993 4.626172 33.405103)"
          fill="none"
          stroke="#671010"
          stroke-width="13"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-miterlimit="6"
          stroke-dashoffset="53.29"
          stroke-dasharray="53.29"
        />
        <path
          d="M119.472372,74.99985c15.483966,3.003852,22.142541,18.072494,17.60571,16.888089s-13.62114-8.444044-17.60571-1.072528"
          transform="translate(0 0.000002)"
          fill="none"
          stroke="#671010"
          stroke-width="10"
          stroke-linecap="round"
          stroke-dashoffset="47.91"
          stroke-dasharray="47.91"
        />
      </svg>
    );
  }
  const svgRef = useRef();

  useEffect(() => {
    const svgElement = svgRef.current;
    const paths = svgElement.querySelectorAll("path");

    paths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.transition = "stroke-dashoffset 2s ease-in-out";
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;

      setTimeout(() => {
        path.style.strokeDashoffset = "0";
      }, 1000);
    });
  }, []);

  return (
    <div>
      <AnimatedSVG ref={svgRef} />
    </div>
  );
};

export default AnimatedSVGComponent;
