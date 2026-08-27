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

    vec2 distortion = vec2(nx, ny) - 0.5;

    // Make the distortion obvious for testing
    distortion *= 0.08;

    vec2 uv = clamp(
    v_texCoords + distortion,
    0.0,
    1.0
	);

	vec4 color = vec4(0.0 + (nx*0.2), 0.0 + (nx*0.3) ,0.1+(nx*0.3), 0);
   
    gl_FragColor = texture2D(u_texture, uv) + color;
}

