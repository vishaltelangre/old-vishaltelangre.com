module Shell.Update exposing (commandName, handleKeyDown, handleEnterKeypress)

import History
import Keyboard exposing (KeyCode)
import Models exposing (Model)
import Msgs exposing (Msg(..))
import Set exposing (Set)
import Shell.Commands exposing (ShellCommandName)
import Ports


type Direction
    = Up
    | Down


enterKeyCode : KeyCode
enterKeyCode =
    13


ctrlKeyCode : KeyCode
ctrlKeyCode =
    17


upArrowKeyCode : KeyCode
upArrowKeyCode =
    38


downArrowKeyCode : KeyCode
downArrowKeyCode =
    40


lCharKeyCode : KeyCode
lCharKeyCode =
    76


commandName : ShellCommandName -> Model -> ( Model, Cmd Msg )
commandName newCommandName model =
    { model | currentCommandName = newCommandName } ! [ Cmd.none ]


handleKeyDown : KeyCode -> Model -> ( Model, Cmd Msg )
handleKeyDown keyCode model =
    if keyCode == enterKeyCode then
        handleEnterKeypress model
    else if keyCode == upArrowKeyCode then
        handleArrowKeypress Up model
    else if keyCode == downArrowKeyCode then
        handleArrowKeypress Down model
    else if keyCode == lCharKeyCode then
        handleCtrlLCombinationPress model
    else
        model ! []


handleEnterKeypress : Model -> ( Model, Cmd Msg )
handleEnterKeypress model =
    let
        commandName =
            model.currentCommandName |> String.trim |> String.toLower

        history_ =
            case commandName of
                "clear" ->
                    History.add commandName []

                _ ->
                    History.add commandName model.history
    in
        if String.isEmpty commandName then
            { model | currentCommandName = commandName } ! [ Cmd.none ]
        else
            { model
                | currentCommandName = ""
                , history = history_
                , lastCommandIndex = List.length history_
            }
                ! [ Ports.scrollIntoView "prompt" ]


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


handleCtrlLCombinationPress : Model -> ( Model, Cmd Msg )
handleCtrlLCombinationPress model =
    if Set.member ctrlKeyCode model.keysDown then
        { model | history = [] } ! []
    else
        model ! []
