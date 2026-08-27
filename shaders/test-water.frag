uniform sampler2D u_texture;
uniform sampler2D u_noise;

uniform vec2 u_resolution;
uniform vec2 u_campos;
uniform float u_time;

varying vec2 v_texCoords;

void main(){

    vec2 coords = v_texCoords * u_resolution + u_campos;

    // Move the noise over time
    vec2 scroll = vec2(
        u_time / 1000.0,
        u_time / 1500.0
    );

    vec2 noisePos = coords / 150.0 + scroll;

    float nx = texture2D(u_noise, noisePos).r;
    float ny = texture2D(u_noise, noisePos + vec2(5.0, 5.0)).r;

    // Make the distortion obvious for testing
vec2 distortion = vec2(nx, ny) - 0.5;

distortion *= 0.08;

// Fade distortion near tile edges

float edgeX = smoothstep(0.0, 0.15, v_texCoords.x)

            * smoothstep(0.0, 0.15, 1.0 - v_texCoords.x);

float edgeY = smoothstep(0.0, 0.15, v_texCoords.y)

            * smoothstep(0.0, 0.15, 1.0 - v_texCoords.y);

distortion *= edgeX * edgeY;

vec2 uv = v_texCoords + distortion;

	vec4 color = vec4(0.0 + (nx*0.2), 0.0 + (nx*0.3) ,0.1+(nx*0.3), 1.0);
   
    gl_FragColor = texture2D(u_texture, uv) + color;
}

