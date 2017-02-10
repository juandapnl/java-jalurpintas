function wpex_auto_add_link_titles( $content ) {

    // No need to do anything if there isn't any content
    if ( empty( $content ) ) {
        return $content;
    }

    // Define links array
    $links = array();

    // Get page content
    $html = new DomDocument;
    $html->loadHTML( $content );
    $html->preserveWhiteSpace = false;

    // Loop through all content links
    foreach( $html->getElementsByTagName( 'a' ) as $link ) {

        // If the title attribute is already defined no need to do anything
        if ( ! empty( $link->getAttribute( 'title' ) ) ) {
            continue;
        }

        // Get link text
        $link_text = $link->textContent;

        // Save links and link text in $links array
        if ( $link_text ) {
            $links[$link_text] = $link->getAttribute( 'href' );
        }

    }

    // Loop through links array and update post content to add link titles
    if ( ! empty( $links ) ) {
        foreach ( $links as $text => $link ) {
            if ( $link && $text ) {
                $text    = esc_attr( $text ); // Sanitize
                $text    = ucwords( $text );  // Captilize words (looks better imo)
                $replace = $link .'" title="'. $text .'"'; // Add title to link
                $content = str_replace( $link .'"', $replace, $content ); // Replace post content
            }

        }
    }

    // Return post content
    return $content;

}
add_filter( 'the_content', 'wpex_auto_add_link_titles' );
