import unittest

import mock
from classes.APIRequester import APIRequester
from classes.types.Event import Event
from classes.types.Post import RawPost
from classes.types.WebPage import WebPage
from getProcessPosts import _get_all_posts, get_process_posts
from scrapers.FaceScraper import FaceScraper
from scrapers.InstagramScraper import InstagramScraper


class TestGetProcessPosts(unittest.TestCase):
    @mock.patch.object(APIRequester, "get_all_events")
    @mock.patch("getProcessPosts._get_all_posts")
    @mock.patch("getProcessPosts.process_post")
    @mock.patch("getProcessPosts.get_lat_lon_by_address")
    @mock.patch("getProcessPosts.logger")
    def test_get_process_posts_correctly_if_link_not_on_database(
        self,
        mock_logger,
        mock_get_lat_lon_by_address,
        mock_process_post,
        mock_get_all_posts,
        mock_get_all_events,
    ):
        # mocks
        mock_get_all_events.return_value = []

        mock_raw_post = RawPost(
            post_text="Text", post_link="http://mock.link", post_source="Instagram"
        )
        mock_get_all_posts.return_value = [mock_raw_post]

        mock_processed_post = {
            "address": "Mock address",
            "date": "01/01/2023",
            "price": 0,
            "type": "unclassified",
        }
        mock_process_post.return_value = mock_processed_post

        mock_get_lat_lon_by_address.return_value = ("0", "0")

        # call function
        result = get_process_posts()

        # asserts
        expected_result = [
            {
                "address": "Mock address",
                "date": "01/01/2023",
                "price": 0,
                "type": "unclassified",
                "lat": "0",
                "lng": "0",
                "post_link": "http://mock.link",
                "source": "Instagram",
            }
        ]

        self.assertEqual(result, expected_result)
        mock_logger.error.assert_not_called()

    @mock.patch.object(APIRequester, "get_all_events")
    @mock.patch("getProcessPosts._get_all_posts")
    @mock.patch("getProcessPosts.process_post")
    @mock.patch("getProcessPosts.get_lat_lon_by_address")
    @mock.patch("getProcessPosts.logger")
    def test_get_process_posts_correctly_if_link_on_database(
        self,
        mock_logger,
        mock_get_lat_lon_by_address,
        mock_process_post,
        mock_get_all_posts,
        mock_get_all_events,
    ):
        # mocks
        post_link = "http://mock.link"
        mock_event = [
            Event(
                hash_id=1,
                post_link=post_link,
                source="Instagram",
                address="Mock address",
                date="01/01/2023",
                price=0,
                type="unclassified",
                lat="0",
                lng="0",
            )
        ]
        mock_get_all_events.return_value = mock_event

        mock_raw_post = RawPost(
            post_text="Text", post_link=post_link, post_source="Mock Source"
        )
        mock_get_all_posts.return_value = [mock_raw_post]

        # call function
        result = get_process_posts()

        # asserts
        expected_result = []

        self.assertEqual(result, expected_result)
        mock_logger.info.assert_called_with(
            f"Post link already on database: {post_link[:50]}. Skipping process\n"
        )
        mock_process_post.assert_not_called()
        mock_get_lat_lon_by_address.assert_not_called()
        mock_logger.error.assert_not_called()

    @mock.patch.object(APIRequester, "get_all_webpages")
    @mock.patch.object(InstagramScraper, "get_posts")
    @mock.patch.object(FaceScraper, "get_posts")
    def test_get_all_posts(
        self, mock_get_facebook_posts, mock_get_instagram_posts, mock_get_all_webpages
    ):
        # mocks
        mock_webpage = WebPage(
            id=1,
            link="http://mock.link",
            source="Instagram",
            users=[],
        )
        mock_instagram_post = RawPost(
            post_text="Instagram Text",
            post_link="http://instagram.mock.link",
            post_source="Instagram",
        )
        mock_facebook_post = RawPost(
            post_text="Facebook Text",
            post_link="http://facebook.mock.link",
            post_source="Facebook",
        )

        mock_get_all_webpages.return_value = [mock_webpage]
        mock_get_instagram_posts.return_value = {mock_instagram_post}
        mock_get_facebook_posts.return_value = {mock_facebook_post}

        # call function
        result = _get_all_posts()

        # Asserts
        expected_result = {mock_instagram_post, mock_facebook_post}
        self.assertEqual(result, expected_result)


if __name__ == "__main__":
    unittest.main()
