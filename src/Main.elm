module Main exposing (..)

import History exposing (History)
import Html exposing (Html, text, div, p, span, input)
import Html.Attributes exposing (style, type_, id, autofocus, value)
import Html.Events exposing (onInput, on, keyCode, onBlur)
import Json.Decode
import Msgs exposing (Msg(..))
import ShellCommands exposing (ShellCommandName, ShellCommand, ShellCommandResult)


---- MODEL ----


type alias Model =
    { history : History
    , currentCommandName : ShellCommandName
    }


init : ( Model, Cmd Msg )
init =
    ( { history = History.init
      , currentCommandName = ""
      }
    , Cmd.none
    )



---- UPDATE ----


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Input newName ->
            { model | currentCommandName = newName } ! [ Cmd.none ]

        KeyDown keyCode ->
            if keyCode == enterKeyCode then
                handleEnterKeypress model
            else
                model ! [ Cmd.none ]


enterKeyCode : Int
enterKeyCode =
    13


handleEnterKeypress : Model -> ( Model, Cmd Msg )
handleEnterKeypress model =
    let
        commandName =
            String.trim model.currentCommandName
    in
        if String.isEmpty commandName then
            { model | currentCommandName = commandName } ! [ Cmd.none ]
        else
            { model
                | currentCommandName = ""
                , history = History.add commandName model.history
            }
                ! [ Cmd.none ]



---- VIEW ----


view : Model -> Html Msg
view model =
    div []
        [ viewIntro
        , History.view model.history
        , viewShellPrompt model.currentCommandName
        ]


viewShellPrompt : String -> Html Msg
viewShellPrompt commandName =
    div []
        [ viewShellPromptPrefix
        , input
            [ type_ "text"
            , id "prompt"
            , autofocus True
            , onInput Input
            , onKeyDown KeyDown
            , value commandName
            ]
            []
        ]


viewShellPromptPrefix : Html Msg
viewShellPromptPrefix =
    span [ style [ ( "color", "#f00" ) ] ] [ text "$ " ]


onKeyDown : (Int -> msg) -> Html.Attribute msg
onKeyDown tagger =
    on "keydown" (Json.Decode.map tagger keyCode)


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
        , init = init
        , update = update
        , subscriptions = always Sub.none
        }
