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
use PhpOffice\PhpWord\Shared\Html;
use App\Models\Season;


class PrintController extends Controller
{


    public function indexPrint(Request $request){
        {
            $season  = Season::find(session('SESSION_season_id'));
            $seasonSelected  = $season->seasonName;

            return view('admin.print.index',compact(['seasonSelected']));

        }

    }

    public function printprojectMultiple(Request $request){

        // transforma HTML a texto para ponerlo en las tablas de shedulle
        function summerToJx2 ($html) {
            //$html = str_replace('<p>',"<p style='font-size: 10pt; font-family: Optima;'>",$html);
            $html = str_replace('</p>','[ENTER]',$html);
            $html = str_replace('&nbsp;',' ',$html);
            $html = strip_tags($html);
            $html = str_replace('[ENTER]','</w:t><w:br/><w:t>',$html);

            return $html;
        }
        //$season_id        = $request->input('season_id');
        $event_id         = $request->input('event_id');
        $season_id        = session('SESSION_season_id');
        $projectLevel     = $request->input('projectLevel');
        $project_ids      = json_decode( $request->input('project_id'));
        $styleSheduleCell =
        [
            //'borderTopColor' =>'ff0000',
            'borderTopSize' => 7,
            //'borderRightColor' =>'ff0000',
            //'borderRightSize' => 1,
            //'borderBottomColor' =>'ff0000',
            //'borderBottomSize' => 5,
            //'borderLeftColor' =>'ff0000',
            //'borderLeftSize' => 9,
        ];
        $styleSheduleTable =
        [
            //'borderTopColor' =>'ff0000',
            'borderTopSize' => 5,
            //'borderRightColor' =>'ff0000',
            'borderRightSize' => 5,
            //'borderBottomColor' =>'ff0000',
            'borderBottomSize' => 5,
            //'borderLeftColor' =>'ff0000',
            'borderLeftSize' => 5,
        ];
        $styleSheduleGroupCell =
        [
            //'borderTopColor' =>'ff0000',
            //'borderTopSize' => 5,
            //'borderRightColor' =>'ff0000',
            //'borderRightSize' => 1,
            //'borderBottomColor' =>'ff0000',
            //'borderBottomSize' => 1,
            //'borderLeftColor' =>'ff0000',
            //'borderLeftSize' => 9,
        ];


        if (isset($project_ids)) $project_ids = json_decode( $request->input('project_id'));
        else {
            $projecto   = Project::where('event_id',$event_id)->where('season_id',$season_id)->where('projectLevel',$projectLevel)->pluck('id');
            $project_ids[] = $projecto->first();
        }


        $templateWord = new TemplateProcessor('plantillas/projects.docx');

        $templateWord->cloneBlock('block_name',count($project_ids) , true, true);
        $k=0;
        foreach ($project_ids as $key => $project_id) {
            $k++;
            $project       = Project::with('shedules')->with('playlists')->with('events')->with('seasons')->with('addresses')->where('id',$project_id)->where('projectLevel',$projectLevel)->first();
            $seasonName    = $project->seasons->seasonName;
            $eventName     = $project->events->eventName;
            $integrantesC  = $project->addresses;

            //$dateRange     = $project->projectDateIni . ' '.$project->projectDateEnd ;
            $dateDiaSemanaIni = Carbon::parse($project->projectDateIni , 'UTC')->locale('es')->isoFormat('dddd'); // me da el dia de la semana "LUNES"
            $dateDiaFechaIni  = Carbon::parse($project->projectDateIni , 'UTC')->locale('es')->isoFormat('D');
            $dateDiaSemanaEnd = Carbon::parse($project->projectDateEnd , 'UTC')->locale('es')->isoFormat('dddd');
            $dateDiaFechaEnd  = Carbon::parse($project->projectDateEnd , 'UTC')->locale('es')->isoFormat('D MMMM ');
            $dateYearFechaEnd = Carbon::parse($project->projectDateEnd , 'UTC')->locale('es')->isoFormat('YYYY ');
            $dateRevision     = Carbon::parse($project->updated_at , 'UTC')->locale('es')->isoFormat('D MMMM YYYY');

            if ($projectLevel == 1) $revision = 'BORRADOR, actualizado el '.$dateRevision ;
            else  $revision = 'Revisión: V-'.$project->projectRevision.', actualizada el '. $dateRevision;

            $periodo = 'Periodo del '.$dateDiaFechaIni. ' al '.$dateDiaFechaEnd.', '.$dateYearFechaEnd;
            // --- Asignamos valores a la plantilla CABECERA

            $templateWord->setValue('revision#'.$k,$revision);
            $templateWord->setValue('season#'.$k,$seasonName);
            $templateWord->setValue('event#'.$k,$eventName);
            $templateWord->setValue('periodo#'.$k,$periodo);

            // Creamos Integrantes del proyecto
            $integrantes =  collect($integrantesC)->map(function ($integrante, $index) use ($k) {
                $addressgroup = Addressgroup::find($integrante->pivot->addressgroup_id);
                $groupName = ($addressgroup == '' )? '' : $addressgroup->addressgroupName;

                return
                [
                    'addressfirstName#'.$k  => $integrante->addressfirstName,
                    'addresslastName#'.$k  => $integrante->addresslastName,
                    'groupName#'.$k        => $groupName
                ];

            });

            //-- asignamos integrantes
            $templateWord->cloneRowAndSetValues('addressfirstName#'.$k, $integrantes);

            // Creamos Obras del proyecto

            $playlists = $project->playlists->sortBy('playlistOrder')->values();
            $configCompleta = $project->seasons->configs->configCompleta;
            $numeroObras = $playlists->count() - $playlists->where('workName','PAUSA')->count();

            $obras = collect($playlists)->map(function ($playlist) use($k) {
                $composer = Composer::where('id',$playlist->composer_id)->first();
                $compositor = ($composer == null)? '' : $composer->composerLastname.', '.$composer->composerFirstname ;
                $stringDescomp = explode(',',$playlist->playlistString);
                if (count($stringDescomp) != 5 ){
                    switch ($playlist->playlistString) {
                        case 'completa' :
                        case '14,12,10,8,7':
                            $stringDescomp[0] = 14 ;
                            $stringDescomp[1] = 12 ;
                            $stringDescomp[2] = 10 ;
                            $stringDescomp[3] = 8 ;
                            $stringDescomp[4] = 7 ;
                            $cuerda           = 'completa';
                            break;
                        case 'reducida' :
                        case '10,8,6,4,2':
                            $stringDescomp[0] = 10 ;
                            $stringDescomp[1] = 8 ;
                            $stringDescomp[2] = 6 ;
                            $stringDescomp[3] = 4 ;
                            $stringDescomp[4] = 2 ;
                            $cuerda           = 'reducida';
                            break;
                        case 'por determinar':
                            $stringDescomp[0] = 0 ;
                            $stringDescomp[1] = 0 ;
                            $stringDescomp[2] = 0 ;
                            $stringDescomp[3] = 0 ;
                            $stringDescomp[4] = 0 ;
                            $cuerda           = 'por determinar';
                            break;
                        case 'sin cuerda':
                            $stringDescomp[0] = 0 ;
                            $stringDescomp[1] = 0 ;
                            $stringDescomp[2] = 0 ;
                            $stringDescomp[3] = 0 ;
                            $stringDescomp[4] = 0 ;
                            $cuerda           = 'sin cuerda';
                            break;
                        case '':
                            $stringDescomp[0] = 0 ;
                            $stringDescomp[1] = 0 ;
                            $stringDescomp[2] = 0 ;
                            $stringDescomp[3] = 0 ;
                            $stringDescomp[4] = 0 ;
                            $cuerda           = 'sin cuerda';
                            break;

                        default:
                            $stringDescomp[0] = 0 ;
                            $stringDescomp[1] = 0 ;
                            $stringDescomp[2] = 0 ;
                            $stringDescomp[3] = 0 ;
                            $stringDescomp[4] = 0 ;
                            $cuerda = 'ERROR' ;
                            break;
                    }
                }

                return
                [
                    'order#'.$k         => $playlist->playlistOrder,
                    'composer#'.$k      => $compositor,
                    'workDuration#'.$k  => ($playlist->workName == 'PAUSA')? '' : $playlist->workDuration,
                    'playlistString#'.$k=> ($playlist->workName == 'PAUSA')? '' : $playlist->playlistString,
                    'pausa#'.$k         => ($playlist->workName == 'PAUSA')? 'PAUSA' : '',
                    'workName#'.$k      => ($playlist->workName == 'PAUSA')? '' : $playlist->workName,
                    'flute#'.$k         => ($playlist->workName == 'PAUSA')? '' :'Fl: '.$playlist->flute,
                    'fluteExp#'.$k      => ($playlist->workName == 'PAUSA' || $playlist->fluteExp    == '' )? '' :'; '.$playlist->fluteExp,
                    'horn#'.$k          => ($playlist->workName == 'PAUSA' )? '' :'Trpa: '.$playlist->horn,
                    'hornExp#'.$k       => ($playlist->workName == 'PAUSA' || $playlist->hornExp    == '' )? '' :'; '.$playlist->hornExp,
                    'timpani#'.$k       => ($playlist->workName == 'PAUSA' )? '' :'Timp: '.$playlist->timpani,
                    'timpaniExp#'.$k    => ($playlist->workName == 'PAUSA' || $playlist->timpaniExp    == '' )? '' :'; '.$playlist->timpaniExp,
                    'arpa#'.$k          => ($playlist->workName == 'PAUSA' )? '' :'Arpa: '.$playlist->harp,
                    'arpaExp#'.$k       => ($playlist->workName == 'PAUSA' || $playlist->arpaExp    == '' )? '' :'; '.$playlist->harpExp,
                    'oboe#'.$k          => ($playlist->workName == 'PAUSA' )? '' :'Ob: '.$playlist->oboe,
                    'oboeExp#'.$k       => ($playlist->workName == 'PAUSA' || $playlist->oboeExp    == '' )? '' :'; '.$playlist->oboeExp,
                    'trumpet#'.$k       => ($playlist->workName == 'PAUSA' )? '' :'Tpta: '.$playlist->trumpet,
                    'trumpetExp#'.$k    => ($playlist->workName == 'PAUSA' || $playlist->trumpetExp    == '' )? '' :'; '.$playlist->trumpetExp,
                    'percussion#'.$k    => ($playlist->workName == 'PAUSA' )? '' :'Prc: '.$playlist->percussion,
                    'percussionExp#'.$k => ($playlist->workName == 'PAUSA' || $playlist->percussionExp == '' )? '' :'; '.$playlist->percussionExp,
                    'keyboard#'.$k      => ($playlist->workName == 'PAUSA' )? '' :'Tecl: '.$playlist->keyboard,
                    'keyboardExp#'.$k   => ($playlist->workName == 'PAUSA' || $playlist->keyboardExp    == '' )? '' :'; '.$playlist->keyboardExp,
                    'clarinet#'.$k      => ($playlist->workName == 'PAUSA' )? '' :'Cl: '.$playlist->clarinet,
                    'clarinetExp#'.$k   => ($playlist->workName == 'PAUSA' || $playlist->clarinetExp    == '' )? '' :'; '.$playlist->clarinetExp,
                    'trombone#'.$k      => ($playlist->workName == 'PAUSA' )? '' :'Trpa: '.$playlist->trombone,
                    'tromboneExp#'.$k   => ($playlist->workName == 'PAUSA' || $playlist->tromboneExp    == '' )? '' :'; '.$playlist->tromboneExp,
                    'extra#'.$k         => ($playlist->workName == 'PAUSA' )? '' :'Ext: '.$playlist->extra,
                    'extraExp#'.$k      => ($playlist->workName == 'PAUSA' || $playlist->extraExp    == '' )? '' :'; '.$playlist->extraExp,
                    'bassoon#'.$k       => ($playlist->workName == 'PAUSA' )? '' :'Fg: '.$playlist->bassoon,
                    'bassoonExp#'.$k    => ($playlist->workName == 'PAUSA' || $playlist->bassoonExp    == '' )? '' :'; '.$playlist->bassoonExp,
                    'tuba#'.$k          => ($playlist->workName == 'PAUSA' )? '' :'Tb: '.$playlist->tuba,
                    'tubaExp#'.$k       => $playlist->tubaExp,
                    'violin1'           => ($playlist->playlistString == '') ? 0 : (int)$stringDescomp[0],
                    'violin2'           => ($playlist->playlistString == '') ? 0 : (int)$stringDescomp[1],
                    'viola'             => ($playlist->playlistString == '') ? 0 : (int)$stringDescomp[2],
                    'cello'             => ($playlist->playlistString == '') ? 0 : (int)$stringDescomp[3],
                    'cb'                => ($playlist->playlistString == '') ? 0 : (int)$stringDescomp[4],
                    'cuerda'            => $playlist->playlistString
                ];
            });

            // creo tabla de OBRAS y muestro


            $myFontStyle=array('name' => 'Optima', 'size' => 10, 'color' => '1B2232','bold' => false);
            $destacado = array('name' => 'Optima', 'size' => 10, 'color' => '1B2232','bold' => true);
            $pausaStyle = array('bold' => true, 'italic' => true , 'underline' => 'single'); //'bgColor' => '9966CC', 'color' => '669933'
            $table = new Table(array( 'width' => Converter::cmToTwip(18))); //   'borderColor' => 'green', 'width' => 19,'unit' => TblWidth::TWIP) 'borderSize' => 0,
            $pos = 0;
            foreach ($obras as $key => $obra) {

                if ($obra['pausa#'.$k] == 'PAUSA') {
                    $table->addRow();
                    //$table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(1), array('vMerge' => 'restart'))->addText('', $myFontStyle, array('align' => 'center'));
                    $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(19), array('bgColor' => 'DAF7A6','font' => 'Optima','gridSpan' => 5, 'vMerge' => 'restart'))->addText('PAUSA', $pausaStyle, array('align' => 'center'));
                } else {
                    $pos++;
                    $table->addRow();
                    $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(1), array('vMerge' => 'restart'))->addText($pos, $myFontStyle, array('align' => 'center'));
                    $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(14), array('font' => 'Optima','gridSpan' => 3, 'vMerge' => 'restart'))->addText($obra['composer#'.$k], $destacado, array('align' => 'left'));
                    $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(4))->addText($obra['workDuration#'.$k], $myFontStyle, array('align' => 'right'));
                    //fila 2
                    $table->addRow();
                    $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(1), array('vMerge' => 'continue'));
                    $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(14), array('gridSpan' => 3, 'vMerge' => 'restart'))->addText($obra['workName#'.$k], $myFontStyle, array('align' => 'left'));
                    $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(4))->addText($obra['playlistString#'.$k], $myFontStyle, array('align' => 'center'));
                    //fila 3
                    $table->addRow();
                    $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(1), array('vMerge' => 'continue'));
                    $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(5))->addText($obra['flute#'.$k].' '.$obra['fluteExp#'.$k], $myFontStyle, array('align' => 'left'));
                    $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(5))->addText($obra['horn#'.$k].' '.$obra['hornExp#'.$k], $myFontStyle, array('align' => 'left'));
                    $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(4))->addText($obra['timpani#'.$k].' '.$obra['timpaniExp#'.$k], $myFontStyle, array('align' => 'left'));
                    $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(4))->addText($obra['arpa#'.$k].' '.$obra['arpaExp#'.$k], $myFontStyle, array('align' => 'left'));
                    //fila 4
                    $table->addRow();
                    $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(1), array('vMerge' => 'continue'));
                    $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(5))->addText($obra['oboe#'.$k].' '.$obra['oboeExp#'.$k], $myFontStyle, array('align' => 'left'));
                    $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(5))->addText($obra['trumpet#'.$k].' '.$obra['trumpetExp#'.$k], $myFontStyle, array('align' => 'left'));
                    $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(4))->addText($obra['percussion#'.$k].' '.$obra['percussionExp#'.$k], $myFontStyle, array('align' => 'left'));
                    $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(4))->addText($obra['keyboard#'.$k].' '.$obra['keyboardExp#'.$k], $myFontStyle, array('align' => 'left'));
                    //fila 5
                    $table->addRow();
                    $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(1), array('vMerge' => 'continue'));
                    $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(5))->addText($obra['clarinet#'.$k].' '.$obra['clarinetExp#'.$k], $myFontStyle, array('align' => 'left'));
                    $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(5))->addText($obra['trombone#'.$k].' '.$obra['tromboneExp#'.$k], $myFontStyle, array('align' => 'left'));
                    $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(4))->addText($obra['extra#'.$k].' '.$obra['extraExp#'.$k], $myFontStyle, array('align' => 'left'));
                    $table->addCell(2000)->addText('');
                    //fila 6
                    $table->addRow();
                    $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(1), array('vMerge' => 'continue'));
                    $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(5))->addText($obra['bassoon#'.$k].' '.$obra['bassoonExp#'.$k], $myFontStyle, array('align' => 'left'));
                    $table->addCell(\PhpOffice\PhpWord\Shared\Converter::cmToTwip(5))->addText($obra['tuba#'.$k].' '.$obra['tubaExp#'.$k], $myFontStyle, array('align' => 'left'));

                }
            }

            $templateWord->setComplexBlock('table#'.$k, $table);
            // -- busco Plantilla Maxima y lo establezco

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


            $templateWord->setValue('fluteMax#'.$k,$fluteMax);
            $templateWord->setValue('oboeMax#'.$k,$oboeMax);
            $templateWord->setValue('clarinetMax#'.$k,$clarinetMax);
            $templateWord->setValue('bassoonMax#'.$k,$bassoonMax);
            $templateWord->setValue('hornMax#'.$k,$hornMax);
            $templateWord->setValue('trumpetMax#'.$k,$trumpetMax);
            $templateWord->setValue('tromboneMax#'.$k,$tromboneMax);
            $templateWord->setValue('tubaMax#'.$k,$tubaMax);
            $templateWord->setValue('timpaniMax#'.$k,$timpaniMax);
            $templateWord->setValue('percussionMax#'.$k,$percussionMax);
            $templateWord->setValue('keyboardMax#'.$k,$keyboardMax);

            // calculo y cargo cuerda maxima
            $violin1Max = $obras->max('violin1');
            $violin2Max = $obras->max('violin2');
            $violaMax = $obras->max('viola');
            $celloMax = $obras->max('cello');
            $cbnMax = $obras->max('cb');

            $playlistStringMax = $violin1Max.','.$violin2Max.','. $violaMax.','. $celloMax .','.$cbnMax ;

            switch ($playlistStringMax) {
                case '14,12,10,8,7':
                    $stringDescomp[0] = 14 ;
                    $stringDescomp[1] = 12 ;
                    $stringDescomp[2] = 10 ;
                    $stringDescomp[3] = 8 ;
                    $stringDescomp[4] = 7 ;
                    $cuerda           = 'completa';
                    break;
                case '10,8,6,4,2':
                    $stringDescomp[0] = 10 ;
                    $stringDescomp[1] = 8 ;
                    $stringDescomp[2] = 6 ;
                    $stringDescomp[3] = 4 ;
                    $stringDescomp[4] = 2 ;
                    $cuerda           = 'reducida';
                    break;
                case 'por determinar':
                    $stringDescomp[0] = 0 ;
                    $stringDescomp[1] = 0 ;
                    $stringDescomp[2] = 0 ;
                    $stringDescomp[3] = 0 ;
                    $stringDescomp[4] = 0 ;
                    $cuerda           = 'por determinar';
                    break;
                case 'sin cuerda':
                    $stringDescomp[0] = 0 ;
                    $stringDescomp[1] = 0 ;
                    $stringDescomp[2] = 0 ;
                    $stringDescomp[3] = 0 ;
                    $stringDescomp[4] = 0 ;
                    $cuerda           = 'sin cuerda';
                    break;
                case '':
                    $stringDescomp[0] = 0 ;
                    $stringDescomp[1] = 0 ;
                    $stringDescomp[2] = 0 ;
                    $stringDescomp[3] = 0 ;
                    $stringDescomp[4] = 0 ;
                    $cuerda           = 'sin cuerda';
                    break;

                default:

                    $cuerda = $playlistStringMax ;
                    break;
            }

            $templateWord->setValue('playlistStringMax#'.$k,$cuerda); // cuerda maxima

            // Cargo bloques de Percussion, keyboard y voces y los muestro

            $perplaylists = new Collection();
            $keyplaylists = new Collection();
            $voiplaylists = new Collection();

            foreach ($playlists as $key => $playlist) {
                $perplaylists = $perplaylists->merge($playlist->perplaylists);
                $keyplaylists = $keyplaylists->merge($playlist->keyplaylists);
                $voiplaylists = $voiplaylists->merge($playlist->voiplaylists);
            };

            $percussions =  collect($perplaylists)->map(function ($percussion) use($k) {
                return['instrumentName#'.$k  => $percussion->instrumentName];
            });
            $keyboards =  collect($keyplaylists)->map(function ($keyboard) use($k){
                return['instrumentName#'.$k  => $keyboard->instrumentName];
            });
            $voices =  collect($voiplaylists)->map(function ($voice) use($k) {
                return['instrumentName#'.$k  => $voice->instrumentName];
            });

            $strPercussion  = ($percussions->count() == 0)? '' : 'Percusión: ';
            $strKeyboard    = ($keyboards->count() == 0)? '' : 'Teclado: ';
            $strVoice       = ($voices->count() == 0)? '' : 'Voces: ';

            foreach ($percussions as $key => $percussion) {
                $strPercussion .= $percussion['instrumentName#'.$k]. ', ';
            };
            foreach ($keyboards as $key => $keyboard) {
                $strKeyboard .= $keyboard['instrumentName#'.$k]. ', ';
            };
            foreach ($voices as $key => $voice) {
                $strVoice .= $voice['instrumentName#'.$k]. ', ';
            };

            $templateWord->setValue('percussion#'.$k,$strPercussion);
            $templateWord->setValue('keyboard#'.$k,$strKeyboard);
            $templateWord->setValue('voice#'.$k,$strVoice);


            /*
            $pertable = new Table(array('width' => Converter::cmToTwip(6)));
            $keytable = new Table(array('width' => Converter::cmToTwip(6)));
            $voitable = new Table(array('width' => Converter::cmToTwip(6)));

            foreach ($percussions as $key => $percussion) {
                //dd($percussion);
                $pertable->addRow();
                $pertable->addCell(Converter::cmToTwip(6))->addText($percussion['instrumentName#'.$k], $myFontStyle, array('align' => 'left'));
            };

            foreach ($keyboards as $key => $keyboard) {
                $keytable->addRow();
                $keytable->addCell(Converter::cmToTwip(6))->addText($keyboard['instrumentName#'.$k], $myFontStyle, array('align' => 'left'));
            };
            foreach ($voices as $key => $voice) {
                $voitable->addRow();
                $voitable->addCell(Converter::cmToTwip(6))->addText($voice['instrumentName#'.$k], $myFontStyle, array('align' => 'left'));
            };

            $templateWord->setComplexBlock('pertable#'.$k, $pertable);
            $templateWord->setComplexBlock('keytable#'.$k, $keytable);
            $templateWord->setComplexBlock('voitable#'.$k, $voitable);
            */

        //-- Creamos  shedule
        $shedules = $project->shedules->sortBy('sheduleOrder')->values();
        $sheduleC = collect($shedules)->map(function ($shedule) use($k) {

            return
            [
                'sheduleDate#'.$k       => Carbon::parse($shedule->sheduleDate , 'UTC')->locale('es')->isoFormat('dddd'),
                'sheduleDay#'.$k        => Carbon::parse($shedule->sheduleDate , 'UTC')->locale('es')->isoFormat('D MMMM YYYY'),
                'shedulehourRange#'.$k  => $shedule->shedulehourRange,
                'sheduleNote#'.$k       => $shedule->sheduleNote,
                'sheduleTipe#'.$k       => $shedule->sheduleTipe,
                'room_id#'.$k           => ($shedule->room_id == '')? '' : $shedule->rooms->roomAcronym

            ];
        });
        $sheduleGroups = $sheduleC->groupBy('sheduleDay#'.$k);
        // Muestro Shedulle

        $tableShedule = new Table($styleSheduleTable, array( 'width' => Converter::cmToTwip(18)));

        foreach ($sheduleGroups as $key => $sheduleGroup) {
            //dd($sheduleGroup);

            $tableShedule->addRow();

            //$textrun->addText($sheduleGroup[0]['sheduleDate#'.$k], $myFontStyle,array('bold' => true));
            //$textrun->addText($sheduleGroup[1]['sheduleDate#'.$k], $myFontStyle);

            //$tableShedule->addCell(Converter::cmToTwip(3),$styleSheduleCell,array('vMerge' => 'restart'))->addText($sheduleGroup[0]['sheduleDate#'.$k]."</w:t><w:br/><w:t>".$sheduleGroup[0]['sheduleDay#'.$k], $destacado, array('align' => 'left'));
            $textrun = $tableShedule->addCell(Converter::cmToTwip(3),$styleSheduleCell)->addTextRun();
            $textrun->addText($sheduleGroup[0]['sheduleDate#'.$k], $destacado, array('align' => 'left'));
            $textrun->addTextBreak();
            $textrun->addText($sheduleGroup[0]['sheduleDay#'.$k], $myFontStyle, array('align' => 'left'));

            foreach ($sheduleGroup as $key => $day) {
                if ($key != 0) {
                    $tableShedule->addRow();
                    $tableShedule->addCell(Converter::cmToTwip(3),$styleSheduleGroupCell, array('vMerge' => 'continue'));
                }
                $tableShedule->addCell(Converter::cmToTwip(3),$styleSheduleCell)->addText($day['shedulehourRange#'.$k], $myFontStyle, array('align' => 'left'));
                $tableShedule->addCell(Converter::cmToTwip(3),$styleSheduleCell)->addText($day['sheduleTipe#'.$k], $myFontStyle, array('align' => 'left'));
                //$noteCell = $tableShedule->addCell(Converter::cmToTwip(7),$styleSheduleCell);
                //$html = str_replace('<p>',"<p style='font-size: 10pt; font-family: Optima;'>",$day['sheduleNote#'.$k]);
                //$html = $day['sheduleNote#'.$k] ;
                //Html::addHtml($noteCell,$html,false,false,null);
                //$tableShedule->addCell(Converter::cmToTwip(7),$styleSheduleCell)->addHtml($day['sheduleNote#'.$k] , false, false);
                $tableShedule->addCell(Converter::cmToTwip(7),$styleSheduleCell)->addText(summerToJx2($day['sheduleNote#'.$k]), $myFontStyle, array('align' => 'left'));
                $tableShedule->addCell(Converter::cmToTwip(3),$styleSheduleCell)->addText($day['room_id#'.$k], $myFontStyle, array('align' => 'left'));
            }
        }
        $templateWord->setComplexBlock('tableShedule#'.$k, $tableShedule);

        } // FIN DEL FOREACH

        // --- Guardamos el documento
        $tempFile = tempnam(sys_get_temp_dir(),'PHPWord');
        $templateWord->saveAs($tempFile);

        $headers = ['Set-Cookie: fileDownload=true; path=/'];
            return response()->download($tempFile,'project.docx',$headers)->deleteFileAfterSend(true);


    }





    /* Imprime un projecto desde plantilla WORD
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
                'workDuration'  => ($playlist->workName == 'PAUSA')? '' : $playlist->workDuration,
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

        $headers = ['Set-Cookie: fileDownload=true; path=/'];
    //        $headers = ["Cache-Control", "no-cache, no-store, must-revalidate"];

        return response()->download($tempFile,'project.docx',$headers)->deleteFileAfterSend(true);

        //Load temp file para pasarlo a ODT
        //$phpWord = \PhpOffice\PhpWord\IOFactory::load('PRUEBAS.docx');

    }
    */
    // Imprime un projecto desde plantilla WORD SIN PLANTILLA


}
