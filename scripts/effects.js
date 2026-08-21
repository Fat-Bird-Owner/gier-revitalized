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

    let color = (target.team.color) ? target.team.color : Pal.accent

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

exports.fissureAvailable = fissureAvailable;
exports.fissureUnavailable = fissureUnavailable;
exports.lineChain = lineChain;
exports.squareFx = squareFx;

Events.on(ClientLoadEvent, () => {
try {

Vars.content.unit("gr-restoration").abilities.get(0).damageEffect = lineChain;
Vars.content.unit("gr-restoration").abilities.get(1).healEffect = squareFx;
    
} catch(e){
log(e)
}});
