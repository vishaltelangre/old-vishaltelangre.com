module Shell.Update exposing (commandName, handleKeyDown)

import History
import Models exposing (Model)
import Msgs exposing (Msg(..))
import Shell.Commands exposing (ShellCommandName)


type Direction
    = Up
    | Down


commandName : ShellCommandName -> Model -> ( Model, Cmd Msg )
commandName newCommandName model =
    { model | currentCommandName = newCommandName } ! [ Cmd.none ]


handleKeyDown : Int -> Model -> ( Model, Cmd Msg )
handleKeyDown keyCode model =
    case keyCode of
        13 ->
            handleEnterKeypress model

        38 ->
            handleArrowKeypress Up model

        40 ->
            handleArrowKeypress Down model

        _ ->
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
                , lastCommandIndex = (List.length model.history) + 1
            }
                ! [ Cmd.none ]


handleArrowKeypress : Direction -> Model -> ( Model, Cmd Msg )
handleArrowKeypress direction model =
    let
        lastCommandIndex =
            model.lastCommandIndex

        updatedLastCommandIndex =
            case direction of
                Up ->
                    lastCommandIndex - 1

                Down ->
                    lastCommandIndex + 1

        historyItem =
            History.get updatedLastCommandIndex model.history
    in
        case historyItem of
            Just ( name, _ ) ->
                { model
                    | currentCommandName = name
                    , lastCommandIndex = updatedLastCommandIndex
                }
                    ! [ Cmd.none ]

            Nothing ->
                model ! [ Cmd.none ]
