module History exposing (..)

import Html exposing (Html, text, div, span, br)
import Html.Attributes exposing (style)
import Msgs exposing (Msg(..))
import ShellCommands exposing (ShellCommandName, ShellCommand, ShellCommandResult)


type alias History =
    List ( ShellCommandName, ShellCommandResult )


init : History
init =
    []


add : ShellCommandName -> History -> History
add commandName history =
    let
        result =
            ShellCommands.get commandName |> .result
    in
        ( commandName, result ) :: history


view : History -> Html Msg
view history =
    let
        viewHistoryItem ( commandName, result ) =
            div []
                [ viewShellPromptPrefix
                , span [] [ text commandName ]
                , br [] []
                , result
                ]
    in
        history
            |> List.reverse
            |> List.map viewHistoryItem
            |> div []


viewShellPromptPrefix : Html Msg
viewShellPromptPrefix =
    span [ style [ ( "color", "#f00" ) ] ] [ text "$ " ]
