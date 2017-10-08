module Models exposing (..)

import Msgs exposing (Msg(..))
import Shell.Commands exposing (ShellCommandName, ShellCommandResult)


type alias HistoryItem =
    ( ShellCommandName, ShellCommandResult )


type alias History =
    List HistoryItem


type alias Model =
    { history : History
    , lastCommandIndex : Int
    , currentCommandName : ShellCommandName
    }


init : ( Model, Cmd Msg )
init =
    ( { history = []
      , lastCommandIndex = 0
      , currentCommandName = ""
      }
    , Cmd.none
    )
