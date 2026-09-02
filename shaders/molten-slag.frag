uniform sampler2D u_noise;
uniform sampler2D u_texture;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_campos;

varying vec2 v_texCoords;

void main(){

    vec2 coords = v_texCoords * u_resolution + u_campos;

    float time = u_time / 24000.0;
    vec2 noisePos = coords / 500.0;

    float noise =
        (
            texture2D(u_noise, noisePos + time) +
            texture2D(
                u_noise,
                noisePos + time * vec2(-0.8, -0.9)
            )
        ).r * 0.5;

    vec4 color = texture2D(u_texture, v_texCoords);

    if(
        (noise > 0.30 && noise < 0.40) ||
        (noise > 0.50 && noise < 0.60) ||
        (noise > 0.70 && noise < 0.80)
    ){
        color.rgb *= 1.25;
    }

    gl_FragColor = color;
}
