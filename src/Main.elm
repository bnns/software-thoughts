module Main exposing (..)

import Html
    exposing
        ( Html
        , a
        , ul
        , li
        , text
        , div
        , h1
        , h3
        , img
        , section
        , p
        , span
        )
import Html.Attributes exposing (class, href, src, target)


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
    div [ class "container" ]
        [ section [ class "header" ]
            [ h1 [] [ text "Software" ]
            , h1 [] [ text "Thoughts" ]
            ]
        , section [ class "about" ]
            [ div []
                [ p []
                    [ text "Hi, I'm "
                    , a [ target "_blank", href "https://github.com/bnns" ] [ text "Dennis Yao" ]
                    , text ", a web developer"
                    ]
                , p [] [ text " based in Texas," ]
                , p [] [ text "and this is my portfolio." ]
                ]
            ]
        , section [ class "links" ]
            [ div [] [ h3 [] [ text "projects" ] ]
            , ul []
                [ li []
                    [ a [ target "_blank", href "https://menubase.xyz" ] [ text "menubase" ]
                    , p [] [ text "a website generator for restaurants" ]
                    ]
                ]
            , div [] [ h3 [] [ text "open source" ] ]
            , ul []
                [ li []
                    [ a [ target "_blank", href "https://24.softwarethoughts.com" ] [ text "24" ]
                    , a [ target "_blank", href "https://github.com/bnns/24" ] [ span [ class "fab fa-github" ] [] ]
                    , p [] [ text "arithmetic card game based on Maths24" ]
                    ]
                , li []
                    [ a [] [ text "front-end clones" ]
                    , a [ target "_blank", href "https://github.com/bnns/clones" ] [ span [ class "fab fa-github" ] [] ]
                    , p [] [ text "clones of popular apps in various frameworks" ]
                    ]
                , li []
                    [ a [] [ text "ex_phaxio" ]
                    , a [ target "_blank", href "https://github.com/bnns/ex_phaxio" ] [ span [ class "fab fa-github" ] [] ]
                    , p [] [ text "elixir client for ", a [ href "https://www.phaxio.com/" ] [ text "phaxio" ] ]
                    ]
                , li []
                    [ a [ target "_blank", href "https://softwarethoughts.com" ] [ text "this site" ]
                    , a [ target "_blank", href "https://github.com/bnns/software-thoughts" ] [ span [ class "fab fa-github" ] [] ]
                    ]
                ]
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
