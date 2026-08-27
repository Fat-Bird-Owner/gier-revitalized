uniform sampler2D u_noise;
uniform sampler2D u_texture;

uniform vec2 u_campos;
uniform vec2 u_resolution;
uniform float u_time;

varying vec2 v_texCoords;

void main(){

vec2 coords = v_texCoords * u_resolution + u_campos;    
vec2 scroll = vec2(u_time / 1200.0, u_time / 1200.0);
vec2 noisePos = coords / 120.0 + scroll;
 
float bTime = u_time / 9000.0; 
float height = ((texture2D(u_noise, noisePos + (bTime)) + texture2D(u_noise, noisePos + (bTime * 1.2) * vec2(-0.8, -0.9)))/2.0).r;

vec2 distortion = (vec2(height) - 0.5) * (1.0 / u_resolution) * 8.0;

if (height > 0.47 && height < 0.5){
distortion *= 1.6;
} else {
distortion *= 0.89;
}
    
vec4 Color = (texture2D(u_texture, v_texCoords + distortion));    

if (height > 0.47 && height < 0.5){
Color *= 0.89;
} else if (height > 0.47) {
Color *= 0.74;
}

Color.a = 1.0;
   
 gl_FragColor = Color;
    
}
