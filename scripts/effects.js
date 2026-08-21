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

exports.fissureAvailable = fissureAvailable
exports.fissureUnavailable = fissureUnavailable
