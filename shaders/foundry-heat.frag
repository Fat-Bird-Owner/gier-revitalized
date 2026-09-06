uniform float u_time;
uniform vec2 u_campos;
uniform vec2 u_resolution;

uniform sampler2D u_noise;
uniform sampler2D u_texture;
varying vec2 v_texCoords;

void main(){

vec2 coords = v_texCoords * u_resolution + u_campos;
vec2 scroll = vec2(u_time/1400.0, u_time/1400.0);
float scale = 3.0;

float noise = ((texture2D(u_noise, coords / scale + scroll * vec2(1, -1)) + texture2D(u_noise, coords / (scale*1.5) + scroll * vec2(0.9, 0.7))) / 2.0).r;     
vec2 distortion = (vec2(noise) - 0.5) * (1.0 / u_resolution) * 8.0;
distortion *= 0.12;
    
vec4 color = texture2D(u_texture, v_texCoords + distortion);
    
color.rgb *= (noise * 2.4);
color.a = noise*1.4;
    
gl_FragColor = color;                     
    
}
