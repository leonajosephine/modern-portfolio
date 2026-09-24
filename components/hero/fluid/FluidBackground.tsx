"use client";

import { useEffect, useRef } from "react";

import {
  renderShader,
  simulationShader,
  splatShader,
  vertexShader,
} from "@/components/hero/fluid/shaders";

const SIMULATION_SIZE = 320;

function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string
) {
  const shader = gl.createShader(type);

  if (!shader) {
    throw new Error("Could not create shader.");
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);

    throw new Error(
      message ?? "Shader compilation failed."
    );
  }

  return shader;
}

function createProgram(
  gl: WebGL2RenderingContext,
  fragmentSource: string
) {
  const vertex = compileShader(
    gl,
    gl.VERTEX_SHADER,
    vertexShader
  );

  const fragment = compileShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentSource
  );

  const program = gl.createProgram();

  if (!program) {
    throw new Error("Could not create WebGL program.");
  }

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);

  gl.deleteShader(vertex);
  gl.deleteShader(fragment);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);

    throw new Error(
      message ?? "Program linking failed."
    );
  }

  return program;
}

function createTarget(
  gl: WebGL2RenderingContext,
  width: number,
  height: number
) {
  const texture = gl.createTexture();
  const framebuffer = gl.createFramebuffer();

  if (!texture || !framebuffer) {
    throw new Error("Could not create fluid target.");
  }

  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_MIN_FILTER,
    gl.LINEAR
  );
  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_MAG_FILTER,
    gl.LINEAR
  );
  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_WRAP_S,
    gl.CLAMP_TO_EDGE
  );
  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_WRAP_T,
    gl.CLAMP_TO_EDGE
  );

  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA16F,
    width,
    height,
    0,
    gl.RGBA,
    gl.HALF_FLOAT,
    null
  );

  gl.bindFramebuffer(
    gl.FRAMEBUFFER,
    framebuffer
  );

  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,
    gl.COLOR_ATTACHMENT0,
    gl.TEXTURE_2D,
    texture,
    0
  );

  if (
    gl.checkFramebufferStatus(gl.FRAMEBUFFER) !==
    gl.FRAMEBUFFER_COMPLETE
  ) {
    throw new Error(
      "Fluid framebuffer is incomplete."
    );
  }

  gl.viewport(0, 0, width, height);
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  return {
    texture,
    framebuffer,
  };
}

export default function FluidBackground() {
  const canvasRef =
    useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
    });

    if (!gl) {
      console.error("WebGL2 is not available.");
      return;
    }

    if (!gl.getExtension("EXT_color_buffer_float")) {
      console.error(
        "EXT_color_buffer_float is not available."
      );
      return;
    }

    let simulationProgram: WebGLProgram;
    let splatProgram: WebGLProgram;
    let renderProgram: WebGLProgram;

    try {
      simulationProgram = createProgram(
        gl,
        simulationShader
      );
      splatProgram = createProgram(
        gl,
        splatShader
      );
      renderProgram = createProgram(
        gl,
        renderShader
      );
    } catch (error) {
      console.error("Fluid shader error:", error);
      return;
    }

    const buffer = gl.createBuffer();

    if (!buffer) {
      return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1,
      ]),
      gl.STATIC_DRAW
    );

    const setupGeometry = (
      program: WebGLProgram
    ) => {
      gl.useProgram(program);

      const location = gl.getAttribLocation(
        program,
        "a_position"
      );

      gl.enableVertexAttribArray(location);

      gl.vertexAttribPointer(
        location,
        2,
        gl.FLOAT,
        false,
        0,
        0
      );
    };

    setupGeometry(simulationProgram);
    setupGeometry(splatProgram);
    setupGeometry(renderProgram);

    const simPreviousLocation =
      gl.getUniformLocation(
        simulationProgram,
        "u_previous"
      );

    const simTexelLocation =
      gl.getUniformLocation(
        simulationProgram,
        "u_texel"
      );

    const simDtLocation =
      gl.getUniformLocation(
        simulationProgram,
        "u_dt"
      );

    const splatPreviousLocation =
      gl.getUniformLocation(
        splatProgram,
        "u_previous"
      );

    const splatPointLocation =
      gl.getUniformLocation(
        splatProgram,
        "u_point"
      );

    const splatForceLocation =
      gl.getUniformLocation(
        splatProgram,
        "u_force"
      );

    const splatRadiusLocation =
      gl.getUniformLocation(
        splatProgram,
        "u_radius"
      );

    const splatAspectLocation =
      gl.getUniformLocation(
        splatProgram,
        "u_aspect"
      );

    const renderFluidLocation =
      gl.getUniformLocation(
        renderProgram,
        "u_fluid"
      );

    const renderResolutionLocation =
      gl.getUniformLocation(
        renderProgram,
        "u_resolution"
      );

    const renderSimTexelLocation =
      gl.getUniformLocation(
        renderProgram,
        "u_simTexel"
      );

    const renderTimeLocation =
      gl.getUniformLocation(
        renderProgram,
        "u_time"
      );

    let readTarget = createTarget(
      gl,
      SIMULATION_SIZE,
      SIMULATION_SIZE
    );

    let writeTarget = createTarget(
      gl,
      SIMULATION_SIZE,
      SIMULATION_SIZE
    );

    const swap = () => {
      const temp = readTarget;
      readTarget = writeTarget;
      writeTarget = temp;
    };

    let pointerX = 0.5;
    let pointerY = 0.5;

    let previousX = 0.5;
    let previousY = 0.5;

    let pointerReady = false;

    let pendingForceX = 0;
    let pendingForceY = 0;

    let pendingSplat = false;

    const handlePointerMove = (
      event: PointerEvent
    ) => {
      const rect =
        canvas.getBoundingClientRect();

      if (
        rect.width <= 0 ||
        rect.height <= 0
      ) {
        return;
      }

      const x = Math.min(
        1,
        Math.max(
          0,
          (event.clientX - rect.left) /
            rect.width
        )
      );

      const y =
        1 -
        Math.min(
          1,
          Math.max(
            0,
            (event.clientY - rect.top) /
              rect.height
          )
        );

      if (!pointerReady) {
        pointerX = x;
        pointerY = y;
        previousX = x;
        previousY = y;
        pointerReady = true;
        return;
      }

      const dx = x - previousX;
      const dy = y - previousY;

      pointerX = x;
      pointerY = y;

      previousX = x;
      previousY = y;

      const rawSpeed =
        Math.sqrt(dx * dx + dy * dy);

      if (rawSpeed <= 0.000025) {
        return;
      }

      /*
       * Slow movement should still visibly push the gel.
       * We preserve direction but give small gestures a
       * minimum useful amount of force.
       */
      const safeSpeed = Math.max(
        rawSpeed,
        0.000001
      );

      const directionX = dx / safeSpeed;
      const directionY = dy / safeSpeed;

      const amplifiedSpeed = Math.min(
        0.072,
        0.012 +
          Math.pow(
            Math.min(rawSpeed * 18.0, 1.0),
            0.58
          ) *
            0.060
      );

      pendingForceX =
        directionX * amplifiedSpeed;

      pendingForceY =
        directionY * amplifiedSpeed;

      pendingSplat = true;
    };

    window.addEventListener(
      "pointermove",
      handlePointerMove,
      {
        passive: true,
      }
    );

    const resize = () => {
      const rect =
        canvas.getBoundingClientRect();

      const dpr = Math.min(
        window.devicePixelRatio || 1,
        1.5
      );

      const width = Math.max(
        1,
        Math.round(rect.width * dpr)
      );

      const height = Math.max(
        1,
        Math.round(rect.height * dpr)
      );

      if (
        canvas.width !== width ||
        canvas.height !== height
      ) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    resize();

    window.addEventListener(
      "resize",
      resize
    );

    const bindTexture = (
      texture: WebGLTexture,
      uniform:
        WebGLUniformLocation | null
    ) => {
      gl.activeTexture(gl.TEXTURE0);

      gl.bindTexture(
        gl.TEXTURE_2D,
        texture
      );

      gl.uniform1i(uniform, 0);
    };

    const simulate = (
      dt: number
    ) => {
      gl.bindFramebuffer(
        gl.FRAMEBUFFER,
        writeTarget.framebuffer
      );

      gl.viewport(
        0,
        0,
        SIMULATION_SIZE,
        SIMULATION_SIZE
      );

      gl.useProgram(
        simulationProgram
      );

      bindTexture(
        readTarget.texture,
        simPreviousLocation
      );

      gl.uniform2f(
        simTexelLocation,
        1 / SIMULATION_SIZE,
        1 / SIMULATION_SIZE
      );

      gl.uniform1f(
        simDtLocation,
        dt
      );

      gl.drawArrays(
        gl.TRIANGLES,
        0,
        6
      );

      swap();
    };

    const splat = () => {
      const aspect =
        canvas.width /
        Math.max(canvas.height, 1);

      gl.bindFramebuffer(
        gl.FRAMEBUFFER,
        writeTarget.framebuffer
      );

      gl.viewport(
        0,
        0,
        SIMULATION_SIZE,
        SIMULATION_SIZE
      );

      gl.useProgram(
        splatProgram
      );

      bindTexture(
        readTarget.texture,
        splatPreviousLocation
      );

      gl.uniform2f(
        splatPointLocation,
        pointerX,
        pointerY
      );

      gl.uniform2f(
        splatForceLocation,
        pendingForceX,
        pendingForceY
      );

      /*
       * A little wider than before:
       * this should feel like a soft fingertip pushing
       * thick gel, not like drawing with a thin brush.
       */
      gl.uniform1f(
        splatRadiusLocation,
        0.0038
      );

      gl.uniform1f(
        splatAspectLocation,
        aspect
      );

      gl.drawArrays(
        gl.TRIANGLES,
        0,
        6
      );

      swap();

      pendingSplat = false;
    };

    const startTime =
      performance.now();

    let previousTime =
      startTime;

    let animationFrame = 0;

    const render = (
      now: number
    ) => {
      resize();

      const dt = Math.min(
        (now - previousTime) / 1000,
        1 / 30
      );

      previousTime = now;

      simulate(dt * 60.0);
      simulate(dt * 60.0);

      if (pendingSplat) {
        splat();
      }

      gl.bindFramebuffer(
        gl.FRAMEBUFFER,
        null
      );

      gl.viewport(
        0,
        0,
        canvas.width,
        canvas.height
      );

      gl.useProgram(
        renderProgram
      );

      bindTexture(
        readTarget.texture,
        renderFluidLocation
      );

      gl.uniform2f(
        renderResolutionLocation,
        canvas.width,
        canvas.height
      );

      gl.uniform2f(
        renderSimTexelLocation,
        1 / SIMULATION_SIZE,
        1 / SIMULATION_SIZE
      );

      gl.uniform1f(
        renderTimeLocation,
        (now - startTime) / 1000
      );

      gl.drawArrays(
        gl.TRIANGLES,
        0,
        6
      );

      animationFrame =
        requestAnimationFrame(
          render
        );
    };

    animationFrame =
      requestAnimationFrame(
        render
      );

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      window.removeEventListener(
        "resize",
        resize
      );

      gl.deleteBuffer(buffer);

      gl.deleteTexture(
        readTarget.texture
      );

      gl.deleteTexture(
        writeTarget.texture
      );

      gl.deleteFramebuffer(
        readTarget.framebuffer
      );

      gl.deleteFramebuffer(
        writeTarget.framebuffer
      );

      gl.deleteProgram(
        simulationProgram
      );

      gl.deleteProgram(
        splatProgram
      );

      gl.deleteProgram(
        renderProgram
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-0
        h-full
        w-full
      "
    />
  );
}
