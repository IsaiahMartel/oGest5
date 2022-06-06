<?php

namespace App\Notifications;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use NotificationChannels\WebPush\WebPushMessage;
use NotificationChannels\WebPush\WebPushChannel;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Carbon\Carbon;
class PushDemo extends Notification
{

    use Queueable;
    private $proyects;
    private $target;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct( $request, $request1 )
    {

        $this->proyects = $request;
                $this->target = $request1;
       
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return [WebPushChannel::class];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toWebPush($notifiable, $notification, )
    {
     
       
        return (new WebPushMessage)
            ->title('Se ha actualizado un proyecto')
            ->body($this->proyects)
            ->icon('img/logooGest4.png')
        
            ->data(['fecha' => Carbon::now()])
   ->tag(  $this->target);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
