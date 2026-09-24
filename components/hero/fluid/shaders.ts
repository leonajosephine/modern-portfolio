export const vertexShader = `#version 300 es
precision highp float;

in vec2 a_position;
out vec2 v_uv;

void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

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
        vec2(u_texel.x, 0.0),
        vec2(0.0),
        vec2(1.0)
      )
    );

  vec4 right =
    texture(
      u_previous,
      clamp(
        backUv +
        vec2(u_texel.x, 0.0),
        vec2(0.0),
        vec2(1.0)
      )
    );

  vec4 bottom =
    texture(
      u_previous,
      clamp(
        backUv -
        vec2(0.0, u_texel.y),
        vec2(0.0),
        vec2(1.0)
      )
    );

  vec4 top =
    texture(
      u_previous,
      clamp(
        backUv +
        vec2(0.0, u_texel.y),
        vec2(0.0),
        vec2(1.0)
      )
    );

  vec2 diffusedVelocity =
    advected.xy * 0.82 +
    (
      left.xy +
      right.xy +
      bottom.xy +
      top.xy
    ) *
    0.045;

  float diffusedHeight =
    advected.z * 0.90 +
    (
      left.z +
      right.z +
      bottom.z +
      top.z
    ) *
    0.025;

  diffusedVelocity *= 0.992;
  diffusedHeight *= 0.996;

  outColor =
    vec4(
      diffusedVelocity,
      diffusedHeight,
      1.0
    );
}
`;

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

  state.xy +=
    u_force *
    splat;

  /*
   * Stronger minimum body contribution:
   * slow gestures now still build a visible
   * thick-gel surface.
   */
  float forceStrength =
    length(
      u_force
    );

  state.z =
    min(
      2.8,
      state.z +
      splat *
      (
        0.24 +
        min(
          forceStrength * 2.4,
          0.42
        )
      )
    );

  outColor =
    state;
}
`;

export const renderShader = `#version 300 es
precision highp float;

uniform sampler2D u_fluid;
uniform vec2 u_resolution;
uniform vec2 u_simTexel;
uniform float u_time;

in vec2 v_uv;
out vec4 outColor;

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

vec3 gradientPalette(
  vec2 uv,
  float time
) {
  vec3 base =
    vec3(
      0.965,
      0.950,
      1.0
    );

  vec3 lavender =
    vec3(
      0.49,
      0.37,
      1.0
    );

  vec3 purple =
    vec3(
      0.36,
      0.25,
      0.92
    );

  vec3 periwinkle =
    vec3(
      0.66,
      0.62,
      1.0
    );

  vec3 blue =
    vec3(
      0.43,
      0.72,
      1.0
    );

  vec3 powderBlue =
    vec3(
      0.66,
      0.84,
      1.0
    );

  vec3 pink =
    vec3(
      0.96,
      0.45,
      0.70
    );

  vec3 peach =
    vec3(
      1.0,
      0.55,
      0.30
    );

  vec3 lime =
    vec3(
      0.82,
      1.0,
      0.36
    );

  /*
   * Faster ambient movement.
   *
   * Still slow enough to feel calm, but now
   * clearly readable over a few seconds.
   */
  vec2 flowUv =
    uv;

  flowUv.x +=
    sin(
      uv.y * 3.2 +
      time * 0.28
    ) *
    0.036;

  flowUv.x +=
    sin(
      uv.y * 6.8 -
      time * 0.17
    ) *
    0.015;

  flowUv.x +=
    cos(
      (
        uv.x +
        uv.y
      ) *
      4.2 +
      time * 0.14
    ) *
    0.010;

  flowUv.y +=
    cos(
      uv.x * 2.8 -
      time * 0.24
    ) *
    0.032;

  flowUv.y +=
    sin(
      (
        uv.x +
        uv.y
      ) *
      5.0 +
      time * 0.18
    ) *
    0.014;

  flowUv.y +=
    cos(
      uv.x * 7.0 +
      time * 0.12
    ) *
    0.008;

  /*
   * The actual color centers now travel enough
   * that the composition visibly changes while
   * the user is looking at the Hero.
   */
  vec2 lavenderPosition =
    vec2(
      0.16 +
      sin(
        time * 0.22
      ) *
      0.19 +
      cos(
        time * 0.095
      ) *
      0.045,

      0.75 +
      cos(
        time * 0.17
      ) *
      0.15
    );

  vec2 bluePosition =
    vec2(
      0.80 +
      cos(
        time * 0.19
      ) *
      0.18,

      0.70 +
      sin(
        time * 0.21
      ) *
      0.14
    );

  vec2 pinkPosition =
    vec2(
      0.67 +
      sin(
        time * 0.16
      ) *
      0.18,

      0.27 +
      cos(
        time * 0.20
      ) *
      0.14
    );

  vec2 peachPosition =
    vec2(
      0.16 +
      cos(
        time * 0.20
      ) *
      0.16,

      0.19 +
      sin(
        time * 0.16
      ) *
      0.13
    );

  vec2 centerPosition =
    vec2(
      0.48 +
      sin(
        time * 0.13
      ) *
      0.15,

      0.52 +
      cos(
        time * 0.15
      ) *
      0.14
    );

  vec2 purplePosition =
    vec2(
      0.42 +
      cos(
        time * 0.12
      ) *
      0.20,

      0.69 +
      sin(
        time * 0.14
      ) *
      0.14
    );

  vec2 limePosition =
    vec2(
      0.88 +
      sin(
        time * 0.12
      ) *
      0.08,

      0.18 +
      cos(
        time * 0.14
      ) *
      0.07
    );

  float lavenderBlob =
    blob(
      flowUv,
      lavenderPosition,
      2.45
    );

  float blueBlob =
    blob(
      flowUv,
      bluePosition,
      2.65
    );

  float pinkBlob =
    blob(
      flowUv,
      pinkPosition,
      2.80
    );

  float peachBlob =
    blob(
      flowUv,
      peachPosition,
      2.95
    );

  float centerBlob =
    blob(
      flowUv,
      centerPosition,
      2.55
    );

  float purpleBlob =
    blob(
      flowUv,
      purplePosition,
      3.00
    );

  float limeBlob =
    blob(
      flowUv,
      limePosition,
      5.2
    );

  float lavenderBreath =
    0.86 +
    sin(
      time * 0.34
    ) *
    0.14;

  float blueBreath =
    0.87 +
    sin(
      time * 0.29 +
      1.8
    ) *
    0.13;

  float pinkBreath =
    0.87 +
    sin(
      time * 0.31 +
      3.4
    ) *
    0.13;

  float peachBreath =
    0.89 +
    sin(
      time * 0.25 +
      5.1
    ) *
    0.11;

  float purpleBreath =
    0.87 +
    sin(
      time * 0.23 +
      2.4
    ) *
    0.13;

  vec3 color =
    base;

  color =
    mix(
      color,
      lavender,
      clamp(
        lavenderBlob *
        0.94 *
        lavenderBreath,
        0.0,
        0.94
      )
    );

  color =
    mix(
      color,
      blue,
      clamp(
        blueBlob *
        0.80 *
        blueBreath,
        0.0,
        0.82
      )
    );

  color =
    mix(
      color,
      pink,
      clamp(
        pinkBlob *
        0.70 *
        pinkBreath,
        0.0,
        0.74
      )
    );

  color =
    mix(
      color,
      peach,
      clamp(
        peachBlob *
        0.66 *
        peachBreath,
        0.0,
        0.70
      )
    );

  color =
    mix(
      color,
      powderBlue,
      clamp(
        centerBlob *
        0.30,
        0.0,
        0.34
      )
    );

  color =
    mix(
      color,
      purple,
      clamp(
        purpleBlob *
        0.31 *
        purpleBreath,
        0.0,
        0.33
      )
    );

  color =
    mix(
      color,
      lime,
      clamp(
        limeBlob *
        0.11,
        0.0,
        0.075
      )
    );

  return color;
}

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
   * Two normal scales:
   * one broad for the soft body deformation,
   * one tighter for the glassy inner edge.
   */
  float hLeft =
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

  float hRight =
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

  float hBottom =
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

  float hTop =
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
      hLeft - hRight,
      hBottom - hTop
    );

  float hLeftWide =
    texture(
      u_fluid,
      clamp(
        v_uv -
        vec2(
          u_simTexel.x * 5.0,
          0.0
        ),
        vec2(0.0),
        vec2(1.0)
      )
    ).z;

  float hRightWide =
    texture(
      u_fluid,
      clamp(
        v_uv +
        vec2(
          u_simTexel.x * 5.0,
          0.0
        ),
        vec2(0.0),
        vec2(1.0)
      )
    ).z;

  float hBottomWide =
    texture(
      u_fluid,
      clamp(
        v_uv -
        vec2(
          0.0,
          u_simTexel.y * 5.0
        ),
        vec2(0.0),
        vec2(1.0)
      )
    ).z;

  float hTopWide =
    texture(
      u_fluid,
      clamp(
        v_uv +
        vec2(
          0.0,
          u_simTexel.y * 5.0
        ),
        vec2(0.0),
        vec2(1.0)
      )
    ).z;

  vec2 broadNormal =
    vec2(
      hLeftWide - hRightWide,
      hBottomWide - hTopWide
    );

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
    heightNormal * 1.65 +
    broadNormal * 0.58 +
    velocityNormal * 0.42;

  float velocityStrength =
    length(
      velocity
    );

  float activity =
    clamp(
      height * 0.92 +
      velocityStrength * 2.35,
      0.0,
      1.0
    );

  float bodyMask =
    smoothstep(
      0.025,
      0.46,
      height
    );

  float coreMask =
    smoothstep(
      0.11,
      0.72,
      height
    );

  /*
   * The untouched background itself also drifts,
   * so the scene is visibly alive before the
   * cursor even interacts with it.
   */
  vec2 ambientUv =
    v_uv;

  ambientUv.x +=
    sin(
      v_uv.y * 2.7 +
      u_time * 0.22
    ) *
    0.012;

  ambientUv.x +=
    sin(
      (
        v_uv.x +
        v_uv.y
      ) *
      4.2 -
      u_time * 0.12
    ) *
    0.006;

  ambientUv.y +=
    cos(
      v_uv.x * 2.4 -
      u_time * 0.19
    ) *
    0.011;

  /*
   * FAKE THICK GLASS / GEL
   *
   * The body gets a broad directional push,
   * while the edge gets a stronger normal-based
   * bend. This is intentionally more readable
   * than physically accurate.
   */
  vec2 bodyDisplacement =
    velocity * 1.75 +
    broadNormal * 0.20;

  vec2 edgeDisplacement =
    normal2 * 0.26;

  vec2 refractedUv =
    clamp(
      ambientUv -
      bodyDisplacement -
      edgeDisplacement,
      vec2(0.0),
      vec2(1.0)
    );

  vec2 deepUv =
    clamp(
      ambientUv -
      velocity * 2.20 -
      broadNormal * 0.31 -
      normal2 * 0.10,
      vec2(0.0),
      vec2(1.0)
    );

  vec2 rimUv =
    clamp(
      ambientUv +
      normal2 * 0.075 -
      velocity * 0.32,
      vec2(0.0),
      vec2(1.0)
    );

  vec3 originalGradient =
    gradientPalette(
      ambientUv,
      u_time
    );

  vec3 refractedGradient =
    gradientPalette(
      refractedUv,
      u_time
    );

  vec3 deepGradient =
    gradientPalette(
      deepUv,
      u_time
    );

  vec3 rimGradient =
    gradientPalette(
      rimUv,
      u_time
    );

  /*
   * The body now visibly carries a displaced
   * copy of the gradient. This is the main
   * readability improvement.
   */
  vec3 color =
    mix(
      originalGradient,
      refractedGradient,
      bodyMask * 0.78
    );

  color =
    mix(
      color,
      deepGradient,
      coreMask * 0.28
    );

  /*
   * Slight chromatic separation at the edge.
   * Very restrained: fake glass, not RGB glitch.
   */
  float rimStrength =
    smoothstep(
      0.004,
      0.070,
      length(normal2)
    ) *
    bodyMask;

  color =
    mix(
      color,
      rimGradient,
      rimStrength * 0.16
    );

  float luminance =
    dot(
      color,
      vec3(
        0.2126,
        0.7152,
        0.0722
      )
    );

  vec3 saturatedColor =
    mix(
      vec3(luminance),
      color,
      1.20
    );

  color =
    mix(
      color,
      saturatedColor,
      bodyMask * 0.28
    );

  /*
   * Broad translucent body:
   * a small lift + tint makes the pushed
   * material visible even over soft colors.
   */
  color +=
    vec3(
      0.028,
      0.020,
      0.052
    ) *
    bodyMask *
    0.34;

  color -=
    vec3(
      0.020,
      0.014,
      0.038
    ) *
    coreMask *
    0.22;

  vec3 normal =
    normalize(
      vec3(
        normal2 * 17.0,
        1.0
      )
    );

  vec3 lightDirection =
    normalize(
      vec3(
        -0.62,
        0.74,
        0.92
      )
    );

  float diffuse =
    dot(
      normal,
      lightDirection
    );

  float ridge =
    smoothstep(
      0.003,
      0.060,
      length(normal2)
    ) *
    bodyMask;

  float broadRidge =
    smoothstep(
      0.002,
      0.050,
      length(broadNormal)
    ) *
    bodyMask;

  float brightEdge =
    smoothstep(
      0.015,
      0.62,
      diffuse
    ) *
    ridge;

  float darkEdge =
    smoothstep(
      0.010,
      0.54,
      -diffuse
    ) *
    ridge;

  /*
   * Broad soft highlight first.
   */
  color +=
    vec3(
      0.18,
      0.16,
      0.27
    ) *
    broadRidge *
    0.22;

  /*
   * Then the sharper glass edge.
   */
  color +=
    vec3(
      0.24,
      0.22,
      0.34
    ) *
    brightEdge *
    0.40;

  color -=
    vec3(
      0.085,
      0.060,
      0.140
    ) *
    darkEdge *
    0.38;

  /*
   * Curvature gives the gel an inner lip.
   */
  float curvature =
    abs(
      hLeft +
      hRight +
      hBottom +
      hTop -
      4.0 * height
    );

  float innerLip =
    smoothstep(
      0.0015,
      0.045,
      curvature
    ) *
    bodyMask;

  color +=
    vec3(
      0.16,
      0.14,
      0.25
    ) *
    innerLip *
    0.20;

  /*
   * Soft specular rather than a hard wet-water
   * sparkle. This keeps it closer to gel/glass.
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
      16.0
    ) *
    ridge;

  color +=
    vec3(
      0.25,
      0.23,
      0.34
    ) *
    specular *
    0.34;

  /*
   * A very soft milky transmission inside
   * thicker areas helps sell material volume.
   */
  vec3 milky =
    mix(
      color,
      vec3(
        0.975,
        0.962,
        1.0
      ),
      0.10
    );

  color =
    mix(
      color,
      milky,
      coreMask * 0.20
    );

  /*
   * Keep untouched background crisp.
   */
  color =
    mix(
      color,
      vec3(
        0.982,
        0.975,
        1.0
      ),
      0.006
    );

  outColor =
    vec4(
      color,
      1.0
    );
}
`;
