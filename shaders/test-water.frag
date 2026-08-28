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

    vec2 scroll = vec2(u_time / 1000.0, u_time / 1000.0);
    vec2 noisePos = coords / 250.0 + scroll;

    float btime = u_time / 4000.0;
    float nx = ((texture2D(u_noise, noisePos + btime) + texture2D(u_noise, noisePos + (btime * 0.8) * vec2(-0.8, -1.1)))/2.0).r;
    float ny = texture2D(u_noise, noisePos + 5.0).r;

    vec2 distortion = (vec2(nx, nx) - 0.5) * (1.0/ u_resolution) * 8.0;
    distortion *= 2.0;

    float fade = smoothstep(1000.0, 2500.0, u_resolution.x);
    float strength = mix(8.0, 0.0, fade);

    vec4 color = texture2D(u_texture, c + distortion);
    color.rgb *= clamp((nx*1.10*strength) + 0.90, 1, 2);

    gl_FragColor = color;
}
