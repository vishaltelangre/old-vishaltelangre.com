module Shell.Update exposing (commandName, handleKeyDown)

import History
import Models exposing (Model)
import Msgs exposing (Msg(..))
import Shell.Commands exposing (ShellCommandName)


enterKeyCode : Int
enterKeyCode =
    13


commandName : ShellCommandName -> Model -> ( Model, Cmd Msg )
commandName newCommandName model =
    { model | currentCommandName = newCommandName } ! [ Cmd.none ]


handleKeyDown : Int -> Model -> ( Model, Cmd Msg )
handleKeyDown keyCode model =
    if keyCode == enterKeyCode then
        handleEnterKeypress model
    else
        model ! [ Cmd.none ]


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
