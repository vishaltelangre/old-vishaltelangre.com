module Models exposing (..)

import Msgs exposing (Msg(..))
import Shell.Commands exposing (ShellCommandName, ShellCommandResult)


type alias History =
    List ( ShellCommandName, ShellCommandResult )


type alias Model =
    { history : History
    , currentCommandName : ShellCommandName
    }


init : ( Model, Cmd Msg )
init =
    ( { history = []
      , currentCommandName = ""
      }
    , Cmd.none
    )
