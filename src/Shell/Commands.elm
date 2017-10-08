module Shell.Commands exposing (..)

import Dict exposing (Dict)
import Html exposing (Html, span, text, br, a)
import Html.Attributes exposing (href, target, style)
import Msgs exposing (Msg)


type alias ShellCommandName =
    String


type alias ShellCommandResult =
    Html Msg


type alias ShellCommands =
    Dict ShellCommandName ShellCommand


type alias ShellCommand =
    { description : Html Msg
    , result : ShellCommandResult
    }


allShellCommands : ShellCommands
allShellCommands =
    [ ( "about", shellCommandAbout )
    , ( "clicks", shellCommandClicks )
    , ( "work", shellCommandWork )
    , ( "github", shellCommandGithub )
    , ( "skills", shellCommandSkills )
    , ( "blog", shellCommandBlog )
    , ( "location", shellCommandLocation )
    , ( "speak", shellCommandSpeak )
    , ( "contact", shellCommandContactInfo )
    , ( "elsewhere", shellCommandElsewhere )
    , ( "source", shellCommandSource )
    , ( "clear", shellCommandClear )
    ]
        |> Dict.fromList


get : ShellCommandName -> ShellCommand
get name =
    case Dict.get name allShellCommands of
        Just shellCommand ->
            shellCommand

        Nothing ->
            if name == "help" then
                shellCommandHelp
            else
                shellCommandNotFound name


shellCommandAbout : ShellCommand
shellCommandAbout =
    let
        description =
            text "A bit about me"

        result =
            span []
                [ text "Umm... You better ask something else."
                , br [] []
                , text "How about `help`, huh?"
                ]
    in
        ShellCommand description result


shellCommandClicks : ShellCommand
shellCommandClicks =
    let
        description =
            text "My Photography"

        result =
            span []
                [ text "Please visit"
                , a
                    [ href "http://clicks.vishaltelangre.com", target "_blank" ]
                    [ text "clicks.vishaltelangre.com" ]
                , text "to see my photography."
                ]
    in
        ShellCommand description result


shellCommandWork : ShellCommand
shellCommandWork =
    let
        description =
            text "Where do I work?"

        result =
            span []
                [ text "I work remotely at"
                , a
                    [ href "http://bigbinary.com", target "_blank" ]
                    [ text "BigBinary" ]
                , text "."
                , br [] []
                , br [] []
                , text "Previously, I worked at"
                , a
                    [ href "http://yogurtlabs.co", target "_blank" ]
                    [ text "Yogurt Labs" ]
                , text ", and"
                , a
                    [ href "http://weboniselab.com", target "_blank" ]
                    [ text "Webonise Lab" ]
                , text "."
                , br [] []
                , br [] []
                , text """Maybe you don't know this; during academics,
                          I had created a popular college search engine for
                          colleges in Maharashtra. It was aimed to suggest
                          colleges based on students' marks, cutoff marks
                          and various other criteria.
                          Head on to"""
                , a
                    [ href "http://2zerozero.com/", target "_blank" ]
                    [ text "2zerozero.com" ]
                , text """to see it live.
                          It is a past 2012 college project, and still alive,
                          but not actively maintained!"""
                ]
    in
        ShellCommand description result


shellCommandGithub : ShellCommand
shellCommandGithub =
    let
        description =
            text "My small projects open sourced on GitHub"

        result =
            span []
                [ text "You can find my open source work"
                , a
                    [ href "https://github.com/vishaltelangre", target "_blank" ]
                    [ text "here" ]
                , text "."
                ]
    in
        ShellCommand description result


shellCommandSkills : ShellCommand
shellCommandSkills =
    let
        description =
            text "I am good at"

        result =
            span []
                [ text """I am a computer programmer.
                          Primarily I write programs in Ruby, JavaScript.
                          Hack in Go on weekends."""
                ]
    in
        ShellCommand description result


shellCommandBlog : ShellCommand
shellCommandBlog =
    let
        description =
            text "Link to my weblog"

        result =
            span []
                [ text "I occasionally write on"
                , a
                    [ href "http://blog.vishaltelangre.com", target "_blank" ]
                    [ text "Poor Programmer's Blog" ]
                , text "."
                ]
    in
        ShellCommand description result


shellCommandLocation : ShellCommand
shellCommandLocation =
    let
        description =
            text "Where do I stay?"

        result =
            span []
                [ text """I am based in Sambhaji Nagar
                          (also known as, Aurangabad) city of
                          Maharashtra, India."""
                ]
    in
        ShellCommand description result


shellCommandSpeak : ShellCommand
shellCommandSpeak =
    let
        description =
            text "Human languages I can speak"

        result =
            span []
                [ text "I speak Marathi, Hindi, and English."
                ]
    in
        ShellCommand description result


shellCommandContactInfo : ShellCommand
shellCommandContactInfo =
    let
        description =
            text "Contact info"

        result =
            span []
                [ text "E-mail (GTalk): the@vishaltelangre.com"
                , br [] []
                , text "Mobile: +91-8087729277"
                , br [] []
                , text "Skype: vishaltelangre"
                ]
    in
        ShellCommand description result


shellCommandElsewhere : ShellCommand
shellCommandElsewhere =
    let
        description =
            text "Other places I can be found"

        result =
            span []
                [ a
                    [ href "http://twitter.com/suruwat", target "_blank" ]
                    [ text "Twitter" ]
                , a
                    [ href "http://in.linkedin.com/in/vishaltelangre", target "_blank" ]
                    [ text "LinkedIn" ]
                , a
                    [ href "http://stackoverflow.com/users/1052356/vishal", target "_blank" ]
                    [ text "StackOverflow" ]
                , a
                    [ href "http://facebook.com/vishaltelangre", target "_blank" ]
                    [ text "Facebook" ]
                , a
                    [ href "http://500px.com/vishaltelangre", target "_blank" ]
                    [ text "500px" ]
                , a
                    [ href "https://plus.google.com/u/0/117409082821975320389", target "_blank" ]
                    [ text "Google+" ]
                , a
                    [ href "http://www.imdb.com/user/ur25704938", target "_blank" ]
                    [ text "IMDb" ]
                ]
    in
        ShellCommand description result


shellCommandSource : ShellCommand
shellCommandSource =
    let
        description =
            text "View source of this page"

        result =
            span []
                [ text "Head on to"
                , a
                    [ href "https://github.com/vishaltelangre/vishaltelangre.com", target "_blank" ]
                    [ text "this repository" ]
                , text "."
                ]
    in
        ShellCommand description result


shellCommandClear : ShellCommand
shellCommandClear =
    let
        description =
            text "Clear this mess"

        result =
            text ""
    in
        ShellCommand description result


shellCommandNotFound : ShellCommandName -> ShellCommand
shellCommandNotFound name =
    let
        description =
            text ""

        result =
            span [] [ text ("command not found - " ++ name) ]
    in
        ShellCommand description result


shellCommandHelp : ShellCommand
shellCommandHelp =
    let
        description =
            text "Show available commands"

        result =
            allShellCommands
                |> Dict.toList
                |> List.map (\( name, command ) -> ( name, command.description ))
                |> (::) ( "help", description )
                |> List.reverse
                |> List.map usage
                |> span []
    in
        ShellCommand description result


usage : ( ShellCommandName, Html Msg ) -> ShellCommandResult
usage ( name, description ) =
    span []
        [ span
            [ style
                [ ( "minWidth", "120px" )
                , ( "display", "inline-block" )
                ]
            ]
            [ text name ]
        , description
        ]
