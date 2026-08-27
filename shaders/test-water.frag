uniform sampler2D u_noise;
uniform vec2 u_resolution; uniform vec2 u_campos; uniform float u_time;
varying vec2 v_texCoords;

void main(){ 
    
vec2 coords = v_texCoords * u_resolution + u_campos;
vec2 scroll = vec2(u_time / 600.0, u_time / 600.0);

float noise = texture2D(u_noise, coords / 40.0 + scroll).r;
vec4 color = vec4(0.25*noise, 0.26*noise, 0.4*noise, 1.0-(noise/2.0));

gl_FragColor = color;
    
}
