<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Lang;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class ResetPassword extends Notification
{
    // use Queueable;

    /**
     * @var string
     */
    public $token;

    /**
     * Constructor
     * 
     * @param  string  $token
     *  トークン
     */
    public function __construct($token)
    {
        $this->token = $token;
    }

    /**
     * Get the notification's channels.
     *
     * @param  mixed  $notifiable
     * @return array|string
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Build the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        logger('パスワードリセットメール送信');
        return (new MailMessage)
            ->subject(Lang::getFromJson('パスワードリセット'))
            ->line(Lang::getFromJson('パスワードのリセットが要請されたためこのメールが送信されました。'))
            ->action(
                Lang::getFromJson('Reset Password'),
                route('dummy.auth.password.reset', ['token' => $this->token])
            )
            ->line(Lang::getFromJson('もしパスワードのリセットに心当たりがない場合は、何もしないでください。'))
        ;
    }
}
