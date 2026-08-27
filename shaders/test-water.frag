uniform sampler2D u_texture;
uniform sampler2D u_noise;

uniform vec2 u_resolution;
uniform vec2 u_campos;
uniform float u_time;

varying vec2 v_texCoords;

void main(){

    // World position
    vec2 coords = v_texCoords * u_resolution + u_campos;

    // Animated noise
    float time = u_time / 1800.0;

    vec2 noisePos = coords / 100.0;

    float n1 = texture2D(
        u_noise,
        noisePos + vec2(time, time * 0.7)
    ).r;

    float n2 = texture2D(
        u_noise,
        noisePos * 1.7 + vec2(-time * 0.6, time)
    ).r;

    float noise = (n1 + n2) * 0.5;

    // Wavy distortion
    float wave = sin(
        coords.x / 12.0 +
        coords.y / 20.0 +
        time * 3.0
    );

    vec2 distortion = vec2(
        wave * 0.5,
        (noise - 0.5)
    );

    distortion *= 1.5 / u_resolution;

    // Sample texture
    vec4 color = texture2D(
        u_texture,
        v_texCoords + distortion
    );

    // Flowing highlights
    float highlight = smoothstep(
        0.68,
        0.82,
        noise + wave * 0.15
    );

    color.rgb += vec3(
        highlight * 0.25,
        highlight * 0.35,
        highlight * 0.45
    );

    // Slight animated shading
    color.rgb *= 0.85 + noise * 0.3;

    gl_FragColor = color;
}
