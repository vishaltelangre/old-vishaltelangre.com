module Models exposing (..)

import Keyboard exposing (KeyCode)
import Msgs exposing (Msg(..))
import Set exposing (Set)
import Shell.Commands exposing (ShellCommandName, ShellCommandResult)


type alias HistoryItem =
    ( ShellCommandName, ShellCommandResult )


type alias History =
    List HistoryItem


type alias Model =
    { history : History
    , lastCommandIndex : Int
    , currentCommandName : ShellCommandName
    , keysDown : Set KeyCode
    }


init : ( Model, Cmd Msg )
init =
    ( { history = []
      , lastCommandIndex = 0
      , currentCommandName = ""
      , keysDown = Set.empty
      }
    , Cmd.none
    )
