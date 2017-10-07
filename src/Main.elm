module Main exposing (..)

import Html exposing (Html, text, div, p)


---- MODEL ----


type alias Model =
    {}


init : ( Model, Cmd Msg )
init =
    ( {}, Cmd.none )



---- UPDATE ----


type Msg
    = NoOp


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    ( model, Cmd.none )



---- VIEW ----


view : Model -> Html Msg
view model =
    div [] [ viewIntro ]


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
