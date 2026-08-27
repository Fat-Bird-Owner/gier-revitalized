uniform sampler2D u_texture;
uniform sampler2D u_noise;

uniform vec2 u_resolution;
uniform vec2 u_campos;
uniform float u_time;

varying vec2 v_texCoords;

void main(){

    vec2 c = v_texCoords;
    vec2 v = 1.0 / u_resolution;
    vec2 coords = c * u_resolution + u_campos;

    vec2 scroll = vec2(u_time / 1000.0, u_time / 1500.0);
    vec2 noisePos = coords / 250.0 + scroll;

    float nx = texture2D(u_noise, noisePos).r;
    float ny = texture2D(u_noise, noisePos + 5.0).r;

    vec2 distortion = (vec2(nx, ny) - 0.5) * v * 8.0;

    vec4 color = texture2D(u_texture, c + distortion);

    color.rgb += vec3(nx * 0.3, nx * 0.3, nx * 0.3);

    gl_FragColor = color;
}
