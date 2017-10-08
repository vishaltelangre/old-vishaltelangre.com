module Shell.View exposing (prompt, promptPrefix)

import Html exposing (Html, text, div, span, input)
import Html.Attributes exposing (style, type_, id, autofocus, value)
import Html.Events exposing (onInput, on, keyCode)
import Json.Decode
import Msgs exposing (Msg(..))


prompt : String -> Html Msg
prompt commandName =
    div []
        [ promptPrefix
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


onKeyDown : (Int -> msg) -> Html.Attribute msg
onKeyDown tagger =
    on "keydown" (Json.Decode.map tagger keyCode)


promptPrefix : Html Msg
promptPrefix =
    span [ style [ ( "color", "#f00" ) ] ] [ text "$ " ]
