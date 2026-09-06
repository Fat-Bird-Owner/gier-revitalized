uniform sampler2D u_noise;
uniform sampler2D u_texture;
uniform vec2 u_resolution; 
uniform vec2 u_campos; 
uniform float u_time;
varying vec2 v_texCoords;

void main(){ 

vec2 coords = v_texCoords * u_resolution + u_campos;

float noise = texture2D(u_noise, coords / 4.0).r;
vec4 color = texture2D(u_texture, v_texCoords);

color.a *= (1.0-((noise*2.5)-0.5));
if (color.a >= 0.12) color.a = 1.0;   
color.rgb *= (1.3-((noise*2.6)-0.5));
    
gl_FragColor = color;
}
