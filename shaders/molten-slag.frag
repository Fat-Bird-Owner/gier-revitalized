uniform float u_time;
uniform vec2 u_campos;
uniform vec2 u_resolution;

uniform sampler2D u_texture;
uniform sampler2D u_noise;
varying vec2 v_texCoords;

void main(){
vec2 coords = v_texCoords * u_resolution + u_campos;
float scale = 12.0;
float noise = (texture2D(u_noise, coords / scale) + texture2D(u_noise, coords / scale + (u_time / 1000.0)) / 2.0).r;;
vec2 distortion = (vec2(noise) - 0.5) * (1.0/u_resolution) * 8.0;
distortion *= 0.07;
vec2 u = v_texCoords + distortion;
vec4 color = texture2D(u_texture, v_texCoords); 
float n = 0.5 + 0.5 * sin(u_time/15.0 + (u.x * 10.0 + u.y * 10.0));
gl_FragColor = color * ((n/2.0) + 1.0);
}
