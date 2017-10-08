module Main exposing (..)

import History
import Html exposing (Html, text, div, p, span)
import Models exposing (Model)
import Msgs exposing (Msg(..))
import Shell.Update
import Shell.View


---- UPDATE ----


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Input newName ->
            Shell.Update.commandName newName model

        KeyDown keyCode ->
            Shell.Update.handleKeyDown keyCode model



---- VIEW ----


view : Model -> Html Msg
view model =
    div []
        [ viewIntro
        , History.view model.history
        , Shell.View.prompt model.currentCommandName
        ]


viewIntro : Html msg
viewIntro =
    div []
        [ p []
            [ text """
                    Welcome! I am Vishal.
                    It is a cumbersome job for me to setup a nice homepage.
                    So, I have made it bit boring.
                    """
            ]
        , p []
            [ text """
                    For more information,
                    enter command `help` to list all available commands.
                    Type `about` to know a little bit about me.
                    """
            ]
        ]



---- PROGRAM ----


main : Program Never Model Msg
main =
    Html.program
        { view = view
        , init = Models.init
        , update = update
        , subscriptions = always Sub.none
        }
