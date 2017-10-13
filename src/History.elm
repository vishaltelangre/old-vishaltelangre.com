module History exposing (add, view, get)

import Array
import Html exposing (Html, text, div, span, br)
import Html.Attributes exposing (style, class)
import Models exposing (History, HistoryItem)
import Msgs exposing (Msg(..))
import Shell.Commands exposing (ShellCommandName, shellCommandAnchor)
import Shell.View


add : ShellCommandName -> History -> History
add commandName history =
    let
        result =
            Shell.Commands.get commandName |> .result
    in
        ( commandName, result ) :: history


get : Int -> History -> Maybe HistoryItem
get index history =
    history
        |> List.reverse
        |> Array.fromList
        |> Array.get index


view : History -> Html Msg
view history =
    let
        viewHistoryItem ( commandName, result ) =
            div [ style [ ( "marginBottom", "10px" ) ] ]
                [ Shell.View.promptPrefix
                , shellCommandAnchor commandName
                , br [] []
                , result
                ]
    in
        history
            |> List.reverse
            |> List.map viewHistoryItem
            |> div []
