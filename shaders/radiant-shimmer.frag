#define step 2.0

uniform float u_time;
uniform sampler2D u_noise;
uniform sampler2D u_texture;

uniform vec2 u_campos;
uniform vec2 u_resolution;

varying vec2 v_texCoords;

void main(){

    vec2 coords = v_texCoords * u_resolution + u_campos;
    vec2 scroll = vec2(u_time / 600.0, u_time / 600.0);
    vec4 noiseTex = texture2D(u_noise, coords / 150.0 + scroll);
    vec4 noiseTex2 = texture2D(u_noise, coords / 150.0 + scroll * vec2(-0.6, -0.6));
    float height = ((noiseTex + noiseTex2) / 2.0).r;


    vec2 distortion = (vec2(height) - 0.5) * (1.0 / u_resolution) * 8.0;
    distortion *= 0.05;

    vec2 T = v_texCoords + distortion;
    vec4 color = texture2D(u_texture, T);

    color.g *= 0.5 + height / 1.5;
    color.b *= 0.75 + height / 1.5;
    color.r *= 0.6 + height / 1.5;

    vec2 pixel = 1.0 / u_resolution;
    vec4 center = texture2D(u_texture, T);
    vec4 maxed = max(
        max(
            max(
                texture2D(
                    u_texture,
                    T + vec2(0.0, step) * pixel
                ),
                texture2D(
                    u_texture,
                    T + vec2(0.0, -step) * pixel
                )
            ),
            texture2D(
                u_texture,
                T + vec2(step, 0.0) * pixel
            )
        ),
        texture2D(
            u_texture,
            T + vec2(-step, 0.0) * pixel
        )
    );

    color.a = 0.5 + (height/2.0);
    if(center.a < 0.9 && maxed.a > 0.9){
        color.a = 1.0;
    }

    gl_FragColor = color;
}
