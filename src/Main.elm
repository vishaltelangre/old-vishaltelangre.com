module Main exposing (..)

import Keyboard
import History
import Html exposing (Html, text, div, p, span)
import Html.Attributes exposing (class)
import Models exposing (Model)
import Msgs exposing (Msg(..))
import Set exposing (Set)
import Shell.Update
import Shell.View


---- UPDATE ----


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Input newName ->
            Shell.Update.commandName newName model

        KeyDown keyCode ->
            { model | keysDown = Set.insert keyCode model.keysDown }
                |> Shell.Update.handleKeyDown keyCode

        KeyUp keyCode ->
            { model | keysDown = Set.remove keyCode model.keysDown } ! []



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
            [ span [] [ text "For more information enter command " ]
            , span [ class "command" ] [ text "help" ]
            , span [] [ text " to list all available commands. Type " ]
            , span [ class "command" ] [ text "about" ]
            , span [] [ text " to know a little bit about me." ]
            ]
        ]



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ Keyboard.downs KeyDown
        , Keyboard.ups KeyUp
        ]



---- PROGRAM ----


main : Program Never Model Msg
main =
    Html.program
        { view = view
        , init = Models.init
        , update = update
        , subscriptions = subscriptions
        }
