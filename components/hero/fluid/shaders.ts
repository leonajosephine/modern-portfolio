export const vertexShader = `#version 300 es
precision highp float;

in vec2 a_position;
out vec2 v_uv;

void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;


/* -------------------------------------------------------------------------- */
/* Fluid simulation                                                           */
/* -------------------------------------------------------------------------- */

export const simulationShader = `#version 300 es
precision highp float;

uniform sampler2D u_previous;
uniform vec2 u_texel;
uniform float u_dt;

in vec2 v_uv;
out vec4 outColor;

void main() {
  vec4 center =
    texture(
      u_previous,
      v_uv
    );

  vec2 velocity =
    center.xy;


  /*
   * Follow the velocity backwards to find
   * where this piece of liquid came from.
   *
   * This is the part that makes the trail
   * actually flow instead of just fading.
   */

  vec2 backUv =
    clamp(
      v_uv -
      velocity *
      u_dt *
      0.42,
      vec2(0.0),
      vec2(1.0)
    );


  vec4 advected =
    texture(
      u_previous,
      backUv
    );


  vec4 left =
    texture(
      u_previous,
      clamp(
        backUv -
        vec2(
          u_texel.x,
          0.0
        ),
        vec2(0.0),
        vec2(1.0)
      )
    );


  vec4 right =
    texture(
      u_previous,
      clamp(
        backUv +
        vec2(
          u_texel.x,
          0.0
        ),
        vec2(0.0),
        vec2(1.0)
      )
    );


  vec4 bottom =
    texture(
      u_previous,
      clamp(
        backUv -
        vec2(
          0.0,
          u_texel.y
        ),
        vec2(0.0),
        vec2(1.0)
      )
    );


  vec4 top =
    texture(
      u_previous,
      clamp(
        backUv +
        vec2(
          0.0,
          u_texel.y
        ),
        vec2(0.0),
        vec2(1.0)
      )
    );


  /*
   * Velocity spreads relatively slowly.
   *
   * This keeps the liquid viscous rather
   * than turning it into smoke.
   */

  vec2 diffusedVelocity =
    advected.xy * 0.82 +
    (
      left.xy +
      right.xy +
      bottom.xy +
      top.xy
    ) *
    0.045;


  /*
   * Z stores our persistent liquid height.
   *
   * It diffuses a little more gently and
   * survives longer than the velocity.
   */

  float diffusedHeight =
    advected.z * 0.90 +
    (
      left.z +
      right.z +
      bottom.z +
      top.z
    ) *
    0.025;


  /*
   * Very slow energy loss.
   */

  diffusedVelocity *=
    0.992;

  diffusedHeight *=
    0.996;


  outColor =
    vec4(
      diffusedVelocity,
      diffusedHeight,
      1.0
    );
}
`;


/* -------------------------------------------------------------------------- */
/* Pointer injection                                                          */
/* -------------------------------------------------------------------------- */

export const splatShader = `#version 300 es
precision highp float;

uniform sampler2D u_previous;

uniform vec2 u_point;
uniform vec2 u_force;

uniform float u_radius;
uniform float u_aspect;

in vec2 v_uv;
out vec4 outColor;

void main() {
  vec4 state =
    texture(
      u_previous,
      v_uv
    );


  vec2 difference =
    v_uv -
    u_point;


  difference.x *=
    u_aspect;


  float distanceSquared =
    dot(
      difference,
      difference
    );


  float splat =
    exp(
      -distanceSquared /
      max(
        u_radius,
        0.00001
      )
    );


  /*
   * XY = velocity.
   */

  state.xy +=
    u_force *
    splat;


  /*
   * Z = persistent liquid height.
   *
   * Faster gestures add slightly more
   * material to the surface.
   */

  state.z =
    min(
      2.5,
      state.z +
      splat *
      (
        0.16 +
        min(
          length(u_force) * 1.8,
          0.34
        )
      )
    );


  outColor =
    state;
}
`;


/* -------------------------------------------------------------------------- */
/* Final liquid + gradient render                                             */
/* -------------------------------------------------------------------------- */

export const renderShader = `#version 300 es
precision highp float;

uniform sampler2D u_fluid;

uniform vec2 u_resolution;
uniform vec2 u_simTexel;

uniform float u_time;

in vec2 v_uv;
out vec4 outColor;


/* -------------------------------------------------------------------------- */
/* Gradient helpers                                                           */
/* -------------------------------------------------------------------------- */

float blob(
  vec2 uv,
  vec2 position,
  float size
) {
  return
    exp(
      -length(
        uv -
        position
      ) *
      size
    );
}


/* -------------------------------------------------------------------------- */
/* Living gradient                                                            */
/* -------------------------------------------------------------------------- */

vec3 gradientPalette(
  vec2 uv,
  float time
) {
  vec3 base =
    vec3(
      0.965,
      0.952,
      1.0
    );


  vec3 lavender =
    vec3(
      0.54,
      0.43,
      1.0
    );


  vec3 periwinkle =
    vec3(
      0.68,
      0.65,
      1.0
    );


  vec3 blue =
    vec3(
      0.48,
      0.76,
      1.0
    );


  vec3 pink =
    vec3(
      0.95,
      0.48,
      0.72
    );


  vec3 peach =
    vec3(
      1.0,
      0.57,
      0.32
    );


  vec3 lime =
    vec3(
      0.80,
      1.0,
      0.34
    );


  /*
   * The gradient itself slowly flows.
   *
   * Two frequencies stop the movement
   * from looking like one simple wave.
   */

  vec2 flowUv =
    uv;


  flowUv.x +=
    sin(
      uv.y * 3.2 +
      time * 0.10
    ) *
    0.018;


  flowUv.x +=
    sin(
      uv.y * 7.0 -
      time * 0.055
    ) *
    0.007;


  flowUv.y +=
    cos(
      uv.x * 2.8 -
      time * 0.085
    ) *
    0.016;


  flowUv.y +=
    sin(
      (
        uv.x +
        uv.y
      ) *
      5.0 +
      time * 0.06
    ) *
    0.006;


  /*
   * Slowly moving color bodies.
   */

  vec2 p1 =
    vec2(
      0.13 +
      sin(
        time * 0.10
      ) *
      0.10,

      0.76 +
      cos(
        time * 0.075
      ) *
      0.08
    );


  vec2 p2 =
    vec2(
      0.82 +
      cos(
        time * 0.082
      ) *
      0.09,

      0.72 +
      sin(
        time * 0.095
      ) *
      0.07
    );


  vec2 p3 =
    vec2(
      0.67 +
      sin(
        time * 0.072
      ) *
      0.10,

      0.24 +
      cos(
        time * 0.088
      ) *
      0.08
    );


  vec2 p4 =
    vec2(
      0.16 +
      cos(
        time * 0.090
      ) *
      0.08,

      0.18 +
      sin(
        time * 0.070
      ) *
      0.07
    );


  vec2 p5 =
    vec2(
      0.48 +
      sin(
        time * 0.055
      ) *
      0.09,

      0.51 +
      cos(
        time * 0.063
      ) *
      0.08
    );


  vec2 p6 =
    vec2(
      0.88 +
      sin(
        time * 0.050
      ) *
      0.05,

      0.20 +
      cos(
        time * 0.061
      ) *
      0.05
    );


  float b1 =
    blob(
      flowUv,
      p1,
      3.05
    );


  float b2 =
    blob(
      flowUv,
      p2,
      3.35
    );


  float b3 =
    blob(
      flowUv,
      p3,
      3.45
    );


  float b4 =
    blob(
      flowUv,
      p4,
      3.65
    );


  float b5 =
    blob(
      flowUv,
      p5,
      3.15
    );


  float b6 =
    blob(
      flowUv,
      p6,
      5.2
    );


  /*
   * Tiny intensity breathing.
   */

  float breathe =
    0.92 +
    sin(
      time * 0.16
    ) *
    0.08;


  vec3 color =
    base;


  color =
    mix(
      color,
      lavender,
      clamp(
        b1 *
        0.90 *
        breathe,
        0.0,
        0.90
      )
    );


  color =
    mix(
      color,
      blue,
      clamp(
        b2 *
        0.72,
        0.0,
        0.76
      )
    );


  color =
    mix(
      color,
      pink,
      clamp(
        b3 *
        0.64 *
        (
          1.02 -
          0.06 *
          sin(
            time * 0.13
          )
        ),
        0.0,
        0.68
      )
    );


  color =
    mix(
      color,
      peach,
      clamp(
        b4 *
        0.58,
        0.0,
        0.62
      )
    );


  color =
    mix(
      color,
      periwinkle,
      clamp(
        b5 *
        0.38,
        0.0,
        0.42
      )
    );


  /*
   * Lime is deliberately tiny.
   */

  color =
    mix(
      color,
      lime,
      clamp(
        b6 *
        0.13,
        0.0,
        0.10
      )
    );


  return color;
}


/* -------------------------------------------------------------------------- */
/* Main                                                                       */
/* -------------------------------------------------------------------------- */

void main() {
  vec4 fluid =
    texture(
      u_fluid,
      v_uv
    );


  vec2 velocity =
    fluid.xy;


  float height =
    fluid.z;


  /*
   * ------------------------------------------------------------------------
   * PERSISTENT SURFACE NORMAL
   * ------------------------------------------------------------------------
   *
   * Unlike the old version this comes
   * from the stored fluid texture rather
   * than five cursor circles.
   */

  float heightLeft =
    texture(
      u_fluid,
      clamp(
        v_uv -
        vec2(
          u_simTexel.x * 2.0,
          0.0
        ),
        vec2(0.0),
        vec2(1.0)
      )
    ).z;


  float heightRight =
    texture(
      u_fluid,
      clamp(
        v_uv +
        vec2(
          u_simTexel.x * 2.0,
          0.0
        ),
        vec2(0.0),
        vec2(1.0)
      )
    ).z;


  float heightBottom =
    texture(
      u_fluid,
      clamp(
        v_uv -
        vec2(
          0.0,
          u_simTexel.y * 2.0
        ),
        vec2(0.0),
        vec2(1.0)
      )
    ).z;


  float heightTop =
    texture(
      u_fluid,
      clamp(
        v_uv +
        vec2(
          0.0,
          u_simTexel.y * 2.0
        ),
        vec2(0.0),
        vec2(1.0)
      )
    ).z;


  vec2 heightNormal =
    vec2(
      heightLeft -
      heightRight,

      heightBottom -
      heightTop
    );


  /*
   * A second, slightly wider derivative
   * comes from velocity.
   *
   * This creates additional irregular
   * ridges instead of one perfect ring.
   */

  vec2 velocityNormal =
    vec2(
      texture(
        u_fluid,
        clamp(
          v_uv -
          vec2(
            u_simTexel.x * 3.0,
            0.0
          ),
          vec2(0.0),
          vec2(1.0)
        )
      ).x -

      texture(
        u_fluid,
        clamp(
          v_uv +
          vec2(
            u_simTexel.x * 3.0,
            0.0
          ),
          vec2(0.0),
          vec2(1.0)
        )
      ).x,

      texture(
        u_fluid,
        clamp(
          v_uv -
          vec2(
            0.0,
            u_simTexel.y * 3.0
          ),
          vec2(0.0),
          vec2(1.0)
        )
      ).y -

      texture(
        u_fluid,
        clamp(
          v_uv +
          vec2(
            0.0,
            u_simTexel.y * 3.0
          ),
          vec2(0.0),
          vec2(1.0)
        )
      ).y
    );


  vec2 normal2 =
    heightNormal * 1.35 +
    velocityNormal * 0.42;


  float activity =
    clamp(
      height * 0.72 +
      length(
        velocity
      ) *
      2.0,
      0.0,
      1.0
    );


  /*
   * ------------------------------------------------------------------------
   * AMBIENT LIQUID MOVEMENT
   * ------------------------------------------------------------------------
   */

  vec2 ambientUv =
    v_uv;


  ambientUv.x +=
    sin(
      v_uv.y * 2.7 +
      u_time * 0.09
    ) *
    0.006;


  ambientUv.y +=
    cos(
      v_uv.x * 2.4 -
      u_time * 0.075
    ) *
    0.005;


  /*
   * ------------------------------------------------------------------------
   * REFRACTION
   * ------------------------------------------------------------------------
   *
   * Velocity stretches the gradient in
   * the movement direction.
   *
   * Height normals bend it around the
   * persistent wake.
   */

  vec2 refractedUv =
    ambientUv -
    velocity * 0.78 -
    normal2 * 0.115;


  refractedUv =
    clamp(
      refractedUv,
      vec2(0.0),
      vec2(1.0)
    );


  vec3 color =
    gradientPalette(
      refractedUv,
      u_time
    );


  /*
   * ------------------------------------------------------------------------
   * GEL LIGHTING
   * ------------------------------------------------------------------------
   */

  vec3 normal =
    normalize(
      vec3(
        normal2 * 14.0,
        1.0
      )
    );


  vec3 lightDirection =
    normalize(
      vec3(
        -0.65,
        0.72,
        0.90
      )
    );


  float diffuse =
    dot(
      normal,
      lightDirection
    );


  float ridge =
    smoothstep(
      0.006,
      0.085,
      length(
        normal2
      )
    ) *
    activity;


  float brightEdge =
    smoothstep(
      0.04,
      0.72,
      diffuse
    ) *
    ridge;


  float darkEdge =
    smoothstep(
      0.02,
      0.62,
      -diffuse
    ) *
    ridge;


  /*
   * Pale lavender highlight.
   */

  color +=
    vec3(
      0.16,
      0.14,
      0.24
    ) *
    brightEdge *
    0.24;


  /*
   * Indigo opposite edge.
   */

  color -=
    vec3(
      0.07,
      0.05,
      0.11
    ) *
    darkEdge *
    0.25;


  /*
   * ------------------------------------------------------------------------
   * SECONDARY INNER RIDGE
   * ------------------------------------------------------------------------
   *
   * This gives us a hint of another
   * material edge without drawing an
   * artificial circular ring.
   */

  float innerRidge =
    smoothstep(
      0.015,
      0.13,
      abs(
        heightLeft +
        heightRight -
        heightBottom -
        heightTop
      )
    ) *
    activity;


  color +=
    vec3(
      0.10,
      0.08,
      0.18
    ) *
    innerRidge *
    0.11;


  /*
   * ------------------------------------------------------------------------
   * SPECULAR
   * ------------------------------------------------------------------------
   */

  vec3 viewDirection =
    vec3(
      0.0,
      0.0,
      1.0
    );


  vec3 halfDirection =
    normalize(
      lightDirection +
      viewDirection
    );


  float specular =
    pow(
      max(
        dot(
          normal,
          halfDirection
        ),
        0.0
      ),
      24.0
    ) *
    ridge;


  color +=
    vec3(
      0.20,
      0.18,
      0.28
    ) *
    specular *
    0.22;


  /*
   * Very slight milky finish.
   */

  color =
    mix(
      color,
      vec3(
        0.982,
        0.975,
        1.0
      ),
      0.012
    );


  outColor =
    vec4(
      color,
      1.0
    );
}
`;