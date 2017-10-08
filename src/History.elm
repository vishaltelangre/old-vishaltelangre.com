module History exposing (add, view)

import Html exposing (Html, text, div, span, br)
import Models exposing (History)
import Msgs exposing (Msg(..))
import Shell.Commands exposing (ShellCommandName, ShellCommand, ShellCommandResult)
import Shell.View


add : ShellCommandName -> History -> History
add commandName history =
    let
        result =
            Shell.Commands.get commandName |> .result
    in
        ( commandName, result ) :: history


view : History -> Html Msg
view history =
    let
        viewHistoryItem ( commandName, result ) =
            div []
                [ Shell.View.promptPrefix
                , span [] [ text commandName ]
                , br [] []
                , result
                ]
    in
        history
            |> List.reverse
            |> List.map viewHistoryItem
            |> div []
