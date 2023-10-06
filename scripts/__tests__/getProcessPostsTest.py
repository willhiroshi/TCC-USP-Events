import unittest

import mock
from classes.Post import RawPost
from getProcessPosts import get_process_posts


class TestGetProcessPosts(unittest.TestCase):
    @mock.patch("getProcessPosts.get_instagram_posts")
    @mock.patch("getProcessPosts.process_post")
    @mock.patch("getProcessPosts.get_lat_lon_by_address")
    @mock.patch("getProcessPosts.logger")
    def test_get_process_posts_correctly(
        self,
        mock_logger,
        mock_get_lat_lon_by_address,
        mock_process_post,
        mock_get_instagram_posts,
    ):
        # mocks
        mock_raw_post = RawPost(post_text="Text", post_link="http://mock.link")
        mock_get_instagram_posts.return_value = [mock_raw_post]

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
            }
        ]

        self.assertEqual(result, expected_result)
        mock_logger.error.assert_not_called()


if __name__ == "__main__":
    unittest.main()
