var skills = {
    1: { lv: 1, maxlv: 8, minlv: 1 },
    2: { lv: 0, maxlv: 6, minlv: 0 },
    3: { lv: 0, maxlv: 5, minlv: 0 }
};
var require = { 1: { 1: 0 }, 2: { 1: 2 }, 3: { 1: 3 } };
var skillspos = {
    1: { left: '60px', top: '20px' },
    2: { left: '20px', top: '70px' },
    3: { left: '100px', top: '70px' }
};
var skillsinfo = {
    1: { 1: { skillname: 'Foda', skillreqs: 'Level: 99', skillep: 'Consumo: 70 EP', skillattr: '200 de Dano Físico', skilldesc: 'Alvo: Unico<br />Recarga: 3 Seg<br />Alcance: 12 m' } },
    2: { 1: { skillname: 'Nukadora', skillreqs: 'Level: 99', skillep: 'Consumo: 9000 EP', skillattr: '9999 de Dano Físico', skilldesc: 'Alvo: Unico<br />Recarga: 999 Seg<br />Alcance: 32 m' } },
    3: { 1: { skillname: 'Doom', skillreqs: 'Level: 99', skillep: 'Consumo: 666 EP', skillattr: '666 de Dano Físico', skilldesc: 'Alvo: Unico<br />Recarga: 666 Seg<br />Alcance: 666 m' } }
};

function UpdateLevel(id) {
    $('#skill-' + id).children('.frame').find('.level').html(skills[id].lv + ' / ' + skills[id].maxlv);
}
function checkRequeriment(id) {
    var doneshow = false;
    $.each(require[id], function (i, v) {
        if (skills[i].lv >= v) {
            doneshow = true;
        }
        if (skills[i].lv < v) {
            skills[id].lv = 0;
            UpdateLevel(id);
        }
    });

    if (doneshow && skills[id].lv === 0) {
        $('#skill-' + id).addClass('glow');
    }
    else {
        $('#skill-' + id).removeClass('glow');
    }

    return doneshow;
}
function Update() {
    $.each(skills, function (i, v) {
        $('#skill-' + i).children('.frame').find('.level').html(skills[i].lv + ' / ' + skills[i].maxlv);
        checkRequeriment(i);
        if (skills[i].lv === 0) {
            $('#skill-' + i).css('opacity', '0.5');
        }
        else {
            $('#skill-' + i).css('opacity', '1');
        }
    });
    $.each(skillsinfo, function (i, v) {
        $('#skill-' + i).children('.frame').find('.info').html('');
        $.each(v, function (lvl, arr) {
            if (lvl == skills[i].lv) {
                $.each(arr, function (p, pv) {
                    $('#skill-' + i).children('.frame').find('.info').append('<span class="' + p + '">' + pv + '</span>');
                });
            }
            if (skills[i].lv === 0 && lvl == 1) {
                $.each(arr, function (p, pv) {
                    $('#skill-' + i).children('.frame').find('.info').append('<span class="' + p + '">' + pv + '</span>');
                });
            }
        });
    });
}
function skillPlus(id) {
    if (checkRequeriment(id)) {
        if (skills[id].lv != skills[id].maxlv) {
            skills[id].lv++;
            Update();
        }
    }
}
function skillMinus(id) {
    if (checkRequeriment(id)) {
        if (skills[id].lv !== skills[id].minlv) {
            skills[id].lv--;
            Update();
        }
    }
}
function skillMaster(id) {
    if (checkRequeriment(id)) {
        skills[id].lv = skills[id].maxlv;
        Update();
    }
}

$(document).ready(function () {
    $.each(skillspos, function (i, v) {
        $.each(skillspos[i], function (p, pv) {
            $('#skill-' + i).css(p, pv);
        });
    });
    Update();

    $('.icon').hover(function () {
        $(this).parent().parent().toggleClass('visible');
        $(this).parent().find('.info').slideToggle();
    });
});
