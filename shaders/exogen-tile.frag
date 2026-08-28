#define HIGHP

uniform sampler2D u_texture;

uniform vec2 u_resolution;
uniform vec2 u_campos;
uniform float u_time;

varying vec2 v_texCoords;

void main(){

    vec2 coords = v_texCoords * u_resolution + u_campos;

    vec4 color = texture2D(u_texture, v_texCoords);

    // Moving bands
    float wave = sin(
        coords.x * 0.05 +
        coords.y * 0.03 +
        u_time / 45.0
    );

    // Convert -1..1 into 0..1
    wave = wave * 0.5 + 0.5;

    // Make the bright part narrow
    float glow = smoothstep(0.75, 1.0, wave);

    // Very obvious colored light

	float brightness = (color.r + color.g + color.b) / 3.0;

	if(brightness > 0.5){
    color.rgb += (vec3(glow * 0.827, glow * 0.871, glow *0.894)/3.0);
	}

    gl_FragColor = color;
}
