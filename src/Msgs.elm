module Msgs exposing (..)

import Keyboard exposing (KeyCode)


type Msg
    = Input String
    | KeyDown KeyCode
    | KeyUp KeyCode
    | ShellCommandClick String
