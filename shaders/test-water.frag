uniform sampler2D u_texture;
uniform sampler2D u_noise;

uniform vec2 u_resolution;
uniform vec2 u_campos;
uniform float u_time;

varying vec2 v_texCoords;

void main(){

    vec2 coords = v_texCoords * u_resolution + u_campos;

    vec2 scroll = vec2(
        u_time / 1000.0,
        u_time / 1500.0
    );

    vec2 noisePos = coords / 150.0 + scroll;

    float nx = texture2D(u_noise, noisePos).r;
    float ny = texture2D(
        u_noise,
        noisePos + vec2(5.0, 5.0)
    ).r;

    vec2 distortion = vec2(nx, ny) - 0.5;
    distortion *= 0.08;

    // Original texture
    vec4 original = texture2D(
        u_texture,
        v_texCoords
    );

    // Distorted texture
    vec2 uv = v_texCoords + distortion;

    vec4 distorted = texture2D(
        u_texture,
        uv
    );

    // Blend instead of completely replacing
    vec4 color = mix(
        original,
        distorted,
        0.5
    );

    // Your noise color
    color.rgb += vec3(
        nx * 0.2,
        nx * 0.3,
        nx * 0.3
    );

    gl_FragColor = color;
}
