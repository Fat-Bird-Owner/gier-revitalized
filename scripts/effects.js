const fissureAvailable = new Effect(210, 100, e => {

    const alpha = 1 - e.fin();
    const progress = Interp.sine.apply(e.fin())
    
    Draw.z(122);

    Draw.color(Pal.accent, alpha);
    Fill.square(e.x, e.y, 4);

    Draw.z(144.01);
    Lines.stroke(1.5);
    Lines.stroke(1.5 * (1 - progress))

    Draw.color(Pal.accent, alpha);
    Lines.square(e.x, e.y, 4.5);

    Draw.reset();
});

const fissureUnavailable = new Effect(210, 100, e => {

    const alpha = 1 - e.fin();
    const progress = Interp.sine.apply(e.fin())
    
    Draw.z(122);

    Draw.color(Pal.remove, alpha);
    Fill.square(e.x, e.y, 4);

    Draw.z(144.01);
    Lines.stroke(1.5);
    Lines.stroke(1.5 * (1 - progress))

    Draw.color(Pal.remove, alpha);
    Lines.square(e.x, e.y, 4.5);

    Draw.reset();
});

const lineChain = new Effect(30, e => {
    const target = e.data;

    if(!target || !target.isValid()) return;

    const fin = e.fin();
    const x1 = e.x;
    const y1 = e.y;
    const x2 = target.x;
    const y2 = target.y;

    let color = Pal.accent

    const alpha = 1 - fin;

    Draw.color(color, alpha);

    Lines.stroke(4 * alpha);
    Lines.line(x1, y1, x2, y2);

    Draw.color(Color.white, alpha);
    Lines.stroke(1.2 * alpha);
    Lines.line(x1, y1, x2, y2);

    Draw.reset();
});

const squareFx = new Effect(120, e => {

    const build = Vars.world.buildWorld(e.x, e.y)

    if (!build) return; 

    const size = build.block.size + 8;
    const prog = Interp.sine.apply(e.fin())

    Lines.stroke(2 * prog);
    Draw.color(Pal.remove);

    Draw.alpha(e.fout())
    Lines.square(
        build.x,
        build.y,
        size * prog
    );

    Draw.reset();
});

const healSphere = new Effect(30, 80, e => {

    const sine = Interp.sine.apply(e.fout())
    Draw.color(Pal.accent, e.fout())

    Fill.circle(e.x, e.y, 5 * sine)
    
    Draw.color(Color.white, e.fout())
    Fill.circle(e.x, e.y, 3.75 * sine)

    Draw.reset();
});

const rand = new Rand();

const chainLightning = new Effect(20, 300, e => {
    if(!(e.data instanceof Position)) return;

    var p = e.data;
    var tx = p.getX();
    var ty = p.getY();

    var dst = Mathf.dst(e.x, e.y, tx, ty);

    Tmp.v1.set(p).sub(e.x, e.y).nor();

    var normx = Tmp.v1.x;
    var normy = Tmp.v1.y;

    var range = 6;
    var links = Mathf.ceil(dst / range);
    var spacing = dst / links;

    var points = [];

    rand.setSeed(e.id);

    // Generate the bolt's points once.
    for(var i = 0; i <= links; i++){
        if(i == 0){
            points.push({
                x: e.x,
                y: e.y
            });
        }else if(i == links){
            points.push({
                x: tx,
                y: ty
            });
        }else{
            var len = i * spacing;

            Tmp.v1.setToRandomDirection(rand).scl(range / 2);

            points.push({
                x: e.x + normx * len + Tmp.v1.x,
                y: e.y + normy * len + Tmp.v1.y
            });
        }
    }

    for(var i = 0; i < links; i++){
        var start = i / links;
        var end = (i + 1) / links;

        // Segment appears one by one.
        var progress = Mathf.clamp(
            (e.fin() - start) / (end - start)
        );

        if(progress <= 0) continue;

        var p1 = points[i];
        var p2 = points[i + 1];

        // Draw only the revealed part.
        var x = Mathf.lerp(p1.x, p2.x, progress);
        var y = Mathf.lerp(p1.y, p2.y, progress);

        // Fade each segment after it appears.
        var fade = Mathf.clamp(
            (e.fin() - end) / 0.25
        );

        Draw.color(Color.white, e.color, e.fin());
        Draw.alpha(1 - fade);

        Lines.stroke(2.5);
        Lines.line(
            p1.x,
            p1.y,
            x,
            y
        );
    }

    Draw.reset();
})

chainLightning.followParent = false
chainLightning.rotWithParent = false

let shieldLightning = new Effect(30, e => {

const sides = 60
const distance = 160

const move =  Interp.sineOut.apply(e.fin()) * distance

Draw.z(110)
Draw.color(e.color, e.fout())

for (let i = 0; i < sides; i++){

let roAdd = ((360/sides) * i)
let moveRand = move + (Mathf.random() * -4 + 2)
let nx = e.x + Angles.trnsx(roAdd, moveRand)
let ny = e.y + Angles.trnsy(roAdd, moveRand)

Lines.stroke(2.5 * e.fout())

let roAddView = roAdd + ((Mathf.random() * -64) + 32)
Lines.lineAngle(nx, ny, roAddView + 90, 10)

}

})

exports.fissureAvailable = fissureAvailable;
exports.fissureUnavailable = fissureUnavailable;
exports.lineChain = lineChain;
exports.squareFx = squareFx;
exports.healSphere = healSphere;
exports.chainLightning = chainLightning;
exports.shieldLightning = shieldLightning

Events.on(ClientLoadEvent, () => {
try {

Vars.content.unit("gr-restoration").abilities.get(0).damageEffect = lineChain;
Vars.content.unit("gr-restoration").abilities.get(0).hitEffect = healSphere;
Vars.content.unit("gr-restoration").abilities.get(1).healEffect = squareFx;
Vars.content.unit("gr-electron").abilities.get(2).damageEffect = chainLightning;
Vars.content.unit("gr-arraign").abilities.get(2).damageEffect = chainLightning;
Vars.content.unit("gr-obitus").abilities.get(0).activeEffect = shieldLightning
    
} catch(e){
log(e)
}});
