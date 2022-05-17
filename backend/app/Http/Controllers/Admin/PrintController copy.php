<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use PhpOffice\PhpWord\Style\Language;
use PhpOffice\PhpWord\TemplateProcessor;
use App\Models\Project;
use App\Models\Addressgroup;
use App\Models\Playlist;
use App\Models\Composer;
use App\Models\Shedule;
use App\Models\Room;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Mockery\Undefined;
use PhpOffice\PhpWord\Element\Field;
use PhpOffice\PhpWord\Element\Table;
use PhpOffice\PhpWord\Element\TextRun;
use PhpOffice\PhpWord\SimpleType\TblWidth;
use PhpOffice\PhpWord\Shared\Converter;


class PrintController extends Controller
{


// Imprime un projecto desde plantilla WORD
    public function printProject(Request $request)
    {
        $project_id  = $request->input('project_id');

        $templateWord = new TemplateProcessor('project2.docx');

        $project       = Project::with('shedules')->with('playlists')->with('events')->with('seasons')->with('addresses')->where('id',$project_id)->first();
        $seasonName    = $project->seasons->seasonName;
        $eventName     = $project->events->eventName;
        $integrantesC  = $project->addresses;

// --- Asignamos valores a la plantilla CABECERA

            $templateWord->setValue('season',$seasonName);
            $templateWord->setValue('event',$eventName);


// Creamos Integrantes del proyecto

        $integrantes =  collect($integrantesC)->map(function ($integrante) {
            $addressgroup = Addressgroup::find($integrante->pivot->addressgroup_id);
            $groupName = ($addressgroup == '' )? '' : $addressgroup->addressgroupName;
            return
            [
                'addressfirstName'  => $integrante->addressfirstName,
                'addresslastName'   => $integrante->addresslastName,
                'groupName'         => $groupName

            ];

        });

//-- asignamos integrantes
        $templateWord->cloneRowAndSetValues('addressfirstName', $integrantes);

// Creamos Obras del proyecto

        $playlists = $project->playlists->sortBy('playlistOrder')->values();

        $numeroObras = $playlists->count() - $playlists->where('workName','PAUSA')->count();
        $obras = collect($playlists)->map(function ($playlist){
            $composer = Composer::where('id',$playlist->composer_id)->first();
            $compositor = ($composer == null)? '' : $composer->composerLastname.', '.$composer->composerFirstname ;
            return
            [
                'order'         => $playlist->playlistOrder,
                'composer'      => $compositor,
                'workDuration'  => ($playlist->workName == 'PAUSA')? '' : substr($playlist->workDuration,1,5),
                'playlistString'=> ($playlist->workName == 'PAUSA')? '' : $playlist->playlistString,
                'pausa'         => ($playlist->workName == 'PAUSA')? 'PAUSA' : '',
                'workName'      => ($playlist->workName == 'PAUSA')? '' : $playlist->workName,
                'flute'         => ($playlist->workName == 'PAUSA')? '' :'Fl: '.$playlist->flute,
                'fluteExp'      => ($playlist->workName == 'PAUSA' || $playlist->fluteExp   == '')? '' :'; '.$playlist->fluteExp,
                'horn'          => ($playlist->workName == 'PAUSA' || $playlist->horn       == '')? '' :'Trpa: '.$playlist->horn,
                'hornExp'       => ($playlist->workName == 'PAUSA' || $playlist->hornExp    == '')? '' :'; '.$playlist->hornExp,
                'timpani'       => ($playlist->workName == 'PAUSA' || $playlist->timpani    == '')? '' :'Timp: '.$playlist->timpani,
                'timpaniExp'    => ($playlist->workName == 'PAUSA' || $playlist->timpaniExp == '')? '' :'; '.$playlist->timpaniExp,
                'arpa'          => ($playlist->workName == 'PAUSA' || $playlist->harp       == '')? '' :'Arpa: '.$playlist->harp,
                'arpaExp'       => ($playlist->workName == 'PAUSA' || $playlist->harpExp    == '')? '' :'; '.$playlist->harpExp,
                'oboe'          => ($playlist->workName == 'PAUSA' || $playlist->oboe       == '')? '' :'Ob: '.$playlist->oboe,
                'oboeExp'       => ($playlist->workName == 'PAUSA' || $playlist->oboeExp    == '')? '' :'; '.$playlist->oboeExp,
                'trumpet'       => ($playlist->workName == 'PAUSA' || $playlist->trumpet    == '')? '' :'Tpta: '.$playlist->trumpet,
                'trumpetExp'    => ($playlist->workName == 'PAUSA' || $playlist->trumpetExp == '')? '' :'; '.$playlist->trumpetExp,
                'percussion'    => ($playlist->workName == 'PAUSA' || $playlist->percussion == '')? '' :'Prc: '.$playlist->percussion,
                'percussionExp' => ($playlist->workName == 'PAUSA' || $playlist->percussionExp == '')? '' :'; '.$playlist->percussionExp,
                'keyboard'      => ($playlist->workName == 'PAUSA' || $playlist->keyboard   == '')? '' :'Tecl: '.$playlist->keyboard,
                'keyboardExp'   => ($playlist->workName == 'PAUSA' || $playlist->keyboardExp== '')? '' :'; '.$playlist->keyboardExp,
                'clarinet'      => ($playlist->workName == 'PAUSA' || $playlist->clarinet   == '')? '' :'Cl: '.$playlist->clarinet,
                'clarinetExp'   => ($playlist->workName == 'PAUSA' || $playlist->clarinetExp== '')? '' :'; '.$playlist->clarinetExp,
                'trombone'      => ($playlist->workName == 'PAUSA' || $playlist->trombone   == '')? '' :'Trpa: '.$playlist->trombone,
                'tromboneExp'   => ($playlist->workName == 'PAUSA' || $playlist->tromboneExp== '')? '' :'; '.$playlist->tromboneExp,
                'extra'         => ($playlist->workName == 'PAUSA' || $playlist->extra      == '')? '' :'Ext: '.$playlist->extra,
                'extraExp'      => ($playlist->workName == 'PAUSA' || $playlist->extraExp   == '')? '' :'; '.$playlist->extraExp,
                'bassoon'       => ($playlist->workName == 'PAUSA' || $playlist->bassoon    == '')? '' :'Fg: '.$playlist->bassoon,
                'bassoonExp'    => ($playlist->workName == 'PAUSA' || $playlist->bassoonExp == '')? '' :'; '.$playlist->bassoonExp,
                'tuba'          => ($playlist->workName == 'PAUSA' || $playlist->tuba       == '')? '' :'Tb: '.$playlist->tuba,
                'tubaExp'       => $playlist->tubaExp,

            ];

        });
// creo tabla de OBRAS y muestro


        $myFontStyle=array('name' => 'Optima', 'size' => 10, 'color' => '1B2232','bold' => false);
        $destacado = array('name' => 'Optima', 'size' => 10, 'color' => '1B2232','bold' => true);
        $pausaStyle = array('bold' => true, 'italic' => true , 'underline' => 'single'); //'bgColor' => '9966CC', 'color' => '669933'
        $table = new Table(array( 'width' => Converter::cmToTwip(18))); //   'borderColor' => 'green', 'width' => 19,'unit' => TblWidth::TWIP) 'borderSize' => 0,
        $pos = 0;
        foreach ($obras as $key => $obra) {

            if ($obra['pausa'] == 'PAUSA') {
                $table->addRow();
                //$table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(1), array('vMerge' => 'restart'))->addText('', $myFontStyle, array('align' => 'center'));
                $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(19), array('bgColor' => '669933','font' => 'Optima','gridSpan' => 5, 'vMerge' => 'restart'))->addText('PAUSA', $pausaStyle, array('align' => 'center'));
            } else {
                $pos++;
                $table->addRow();
                $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(1), array('vMerge' => 'restart'))->addText($pos, $myFontStyle, array('align' => 'center'));
                $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(14), array('font' => 'Optima','gridSpan' => 3, 'vMerge' => 'restart'))->addText($obra['composer'], $destacado, array('align' => 'left'));
                $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(4))->addText($obra['workDuration'], $myFontStyle, array('align' => 'right'));
                //fila 2
                $table->addRow();
                $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(1), array('vMerge' => 'continue'));
                $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(14), array('gridSpan' => 3, 'vMerge' => 'restart'))->addText($obra['workName'], $myFontStyle, array('align' => 'left'));
                $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(4))->addText($obra['playlistString'], $myFontStyle, array('align' => 'center'));
                //fila 3
                $table->addRow();
                $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(1), array('vMerge' => 'continue'));
                $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(5))->addText($obra['flute'].' '.$obra['fluteExp'], $myFontStyle, array('align' => 'left'));
                $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(5))->addText($obra['horn'].' '.$obra['hornExp'], $myFontStyle, array('align' => 'left'));
                $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(4))->addText($obra['timpani'].' '.$obra['timpaniExp'], $myFontStyle, array('align' => 'left'));
                $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(4))->addText($obra['arpa'].' '.$obra['arpaExp'], $myFontStyle, array('align' => 'left'));
                //fila 4
                $table->addRow();
                $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(1), array('vMerge' => 'continue'));
                $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(5))->addText($obra['oboe'].' '.$obra['oboeExp'], $myFontStyle, array('align' => 'left'));
                $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(5))->addText($obra['trumpet'].' '.$obra['trumpetExp'], $myFontStyle, array('align' => 'left'));
                $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(4))->addText($obra['percussion'].' '.$obra['percussionExp'], $myFontStyle, array('align' => 'left'));
                $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(4))->addText($obra['keyboard'].' '.$obra['keyboardExp'], $myFontStyle, array('align' => 'left'));
                //fila 5
                $table->addRow();
                $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(1), array('vMerge' => 'continue'));
                $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(5))->addText($obra['clarinet'].' '.$obra['clarinetExp'], $myFontStyle, array('align' => 'left'));
                $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(5))->addText($obra['trombone'].' '.$obra['tromboneExp'], $myFontStyle, array('align' => 'left'));
                $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(4))->addText($obra['extra'].' '.$obra['extraExp'], $myFontStyle, array('align' => 'left'));
                $table->addCell(2000)->addText('');
                //fila 6
                $table->addRow();
                $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(1), array('vMerge' => 'continue'));
                $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(5))->addText($obra['bassoon'].' '.$obra['bassoonExp'], $myFontStyle, array('align' => 'left'));
                $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(5))->addText($obra['tuba'].' '.$obra['tubaExp'], $myFontStyle, array('align' => 'left'));

            }
        }

        $templateWord->setComplexBlock('table', $table);

// Cargo bloques de Percussion, keyboard y voces

        $perplaylists = new Collection();
        $keyplaylists = new Collection();
        $voiplaylists = new Collection();

        foreach ($playlists as $key => $playlist) {
            $perplaylists = $perplaylists->merge($playlist->perplaylists);
            $keyplaylists = $keyplaylists->merge($playlist->keyplaylists);
            $voiplaylists = $voiplaylists->merge($playlist->voiplaylists);
        };

        $percussions =  collect($perplaylists)->map(function ($percussion) {
            return
            [
                'instrumentName'  => $percussion->instrumentName
            ];
        });
        $keyboards =  collect($keyplaylists)->map(function ($keyboard) {
            return
            [
                'instrumentName'  => $keyboard->instrumentName
            ];
        });
        $voices =  collect($voiplaylists)->map(function ($voice) {
            return
            [
                'instrumentName'  => $voice->instrumentName
            ];
        });
// -- Plantilla Maxima

        $fluteMax      = $playlists->max('flute');
        $oboeMax       = $playlists->max('oboe');
        $clarinetMax   = $playlists->max('clarinet');
        $bassoonMax    = $playlists->max('bassoon');
        $hornMax       = $playlists->max('horn');
        $trumpetMax    = $playlists->max('trumpet');
        $tromboneMax   = $playlists->max('trombone');
        $tubaMax       = $playlists->max('tuba');
        $timpaniMax    = $playlists->max('timpani');
        $percussionMax = $playlists->max('percussion');
        $keyboardMax   = $playlists->max('keyboard');


        $templateWord->setValue('fluteMax',$fluteMax);
        $templateWord->setValue('oboeMax',$oboeMax);
        $templateWord->setValue('clarinetMax',$clarinetMax);
        $templateWord->setValue('bassoonMax',$bassoonMax);
        $templateWord->setValue('hornMax',$hornMax);
        $templateWord->setValue('trumpetMax',$trumpetMax);
        $templateWord->setValue('tromboneMax',$tromboneMax);
        $templateWord->setValue('tubaMax',$tubaMax);
        $templateWord->setValue('timpaniMax',$timpaniMax);
        $templateWord->setValue('percussionMax',$percussionMax);
        $templateWord->setValue('keyboardMax',$keyboardMax);


// --  Muestro los instrumentos

        $pertable = new Table(array('width' => Converter::cmToTwip(6)));
        $keytable = new Table(array('width' => Converter::cmToTwip(6)));
        $voitable = new Table(array('width' => Converter::cmToTwip(6)));

        foreach ($percussions as $key => $percussion) {
            //dd($percussion);
            $pertable->addRow();
            $pertable->addCell(Converter::cmToTwip(6))->addText($percussion['instrumentName'], $myFontStyle, array('align' => 'left'));
        };

        foreach ($keyboards as $key => $keyboard) {
            $keytable->addRow();
            $keytable->addCell(Converter::cmToTwip(6))->addText($keyboard['instrumentName'], $myFontStyle, array('align' => 'left'));
        };
        foreach ($voices as $key => $voice) {
            $voitable->addRow();
            $voitable->addCell(Converter::cmToTwip(6))->addText($voice['instrumentName'], $myFontStyle, array('align' => 'left'));
        };

        $templateWord->setComplexBlock('pertable', $pertable);
        $templateWord->setComplexBlock('keytable', $keytable);
        $templateWord->setComplexBlock('voitable', $voitable);
//-- Creamos  shedule
        $shedules = $project->shedules->sortBy('sheduleOrder')->values();
        //dd($shedules);
        $sheduleC = collect($shedules)->map(function ($shedule){

            return
            [
                'sheduleDate' => Carbon::parse($shedule->sheduleDate , 'UTC')->locale('es')->isoFormat('dddd'),
                'sheduleDay' => Carbon::parse($shedule->sheduleDate , 'UTC')->locale('es')->isoFormat('D MMMM YYYY'),
                'shedulehourRange' => $shedule->shedulehourRange,
                'sheduleNote' => $shedule->sheduleNote,
                'sheduleTipe' => $shedule->sheduleTipe,
                'room_id' => ($shedule->room_id == '')? '' : $shedule->rooms->roomAcronym

            ];
        });
        $sheduleGroups = $sheduleC->groupBy('sheduleDate');
        //dd($sheduleGroup);
// Muestro Shedulle

        //$templateWord->cloneRowAndSetValues('sheduleDate', $sheduleGroup);
        $tableShedule = new Table(array( 'width' => Converter::cmToTwip(18))); //   'borderColor' => 'green', 'width' => 19,'unit' => TblWidth::TWIP) 'borderSize' => 0,
        //

        foreach ($sheduleGroups as $key => $sheduleGroup) {
            //dd($sheduleGroup);
            $tableShedule->addRow();
            $tableShedule->addCell(Converter::cmToTwip(3), array('vMerge' => 'restart'))->addText($sheduleGroup[0]['sheduleDate']."</w:t><w:br/><w:t>".$sheduleGroup[0]['sheduleDay'], $myFontStyle, array('align' => 'left'));
            foreach ($sheduleGroup as $key => $day) {
                if ($key != 0) {
                    $tableShedule->addRow();
                    $tableShedule->addCell(Converter::cmToTwip(3), array('vMerge' => 'continue'));
                }
                $tableShedule->addCell(Converter::cmToTwip(3))->addText($day['shedulehourRange'], $myFontStyle, array('align' => 'left'));
                $tableShedule->addCell(Converter::cmToTwip(3))->addText($day['sheduleNote'], $myFontStyle, array('align' => 'left'));
                $tableShedule->addCell(Converter::cmToTwip(7))->addText($day['sheduleTipe'], $myFontStyle, array('align' => 'left'));
                $tableShedule->addCell(Converter::cmToTwip(3))->addText($day['room_id'], $myFontStyle, array('align' => 'left'));
            }
        }
        $templateWord->setComplexBlock('tableShedule', $tableShedule);
// --- Guardamos el documento
        $tempFile = tempnam(sys_get_temp_dir(),'PHPWord');
        $templateWord->saveAs($tempFile);
        $headers = ["Content-Type: application/octet-stream",];

        return response()->download($tempFile,'project.docx',$headers)->deleteFileAfterSend(true);

        //Load temp file para pasarlo a ODT
        //$phpWord = \PhpOffice\PhpWord\IOFactory::load('PRUEBAS.docx');



    }
}
